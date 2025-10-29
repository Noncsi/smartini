import { Server, Socket } from "socket.io";
import { log } from "./log";
import { Room } from "./models/room";
import { rooms } from "./app";
import { Player } from "./models/player";
import SocketEvent from "../../shared/socket-event";
import { generateRoomCode } from "./utils";
import {
  GameBoardSocket,
  PlayerSocket,
  QuestionResponse,
  RoomCode,
} from "./types";

let correctAnswer: string;

export const disconnect = (socket: Socket, reason: string): void => {
  if (socket.data.clientType === "GameBoardSocket") {
    log.info.gameBoardDisconnected();
  } else if (socket.data.clientType === "PlayerSocket") {
    log.info.playerDisconnected(reason);
  } else {
    log.info;
  }
};

export const createRoom = (socket: GameBoardSocket): void => {
  const roomCode = generateRoomCode();
  rooms.set(roomCode, new Room(roomCode, socket));
  socket.data.clientType = "GameBoardSocket";
  socket.emit(SocketEvent.CreateRoomSuccess, roomCode);
};

export const joinPlayerToRoom = (
  server: Server,
  socket: PlayerSocket,
  roomCode: string,
  playerName: string
) => {
  const room = rooms.get(roomCode);
  if (!room) {
    log.error.roomNotFound(roomCode);
    server.emit(SocketEvent.JoinRoomError);
    return;
  }

  const player = room.addNewPlayer(socket, playerName);
  if (!player) {
    server.emit(SocketEvent.JoinRoomError);
    return;
  }

  socket.data.clientType = "PlayerSocket";
  server.emit(SocketEvent.JoinRoomSuccess, player.id);
};

export const toggleReadyStatus = (
  socket: PlayerSocket,
  server: Server,
  playerId: string,
  roomCode: RoomCode
) => {
  const room = rooms.get(roomCode);
  if (!room) return socket.emit(SocketEvent.ToggleReadyStatusError);
  const player = room.players.get(playerId);
  if (!player) return socket.emit(SocketEvent.ToggleReadyStatusError);
  player.isReady = !player.isReady;
  server // tell the gameBoard who clicked ready
    .to(room.socket.id)
    .emit("ready", player.id, player.isReady);

  server.emit(SocketEvent.ToggleReadyStatusSuccess, player.id, player.isReady);

  if ([...room.players.values()].every((player: Player) => player.isReady)) {
    socket.nsp.to(room.roomCode).emit("startGame");
  }
};

const shuffle = (array: Array<any>): Array<any> => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const getQuestion = (socket: GameBoardSocket, roomCode: RoomCode) => {
  fetch("https://opentdb.com/api.php?amount=1&type=multiple").then(
    (response) => {
      response.json().then((resp) => {
        const question: QuestionResponse = {
          question: resp.results[0].question,
          correctAnswer: resp.results[0].correct_answer,
          wrongAnswers: resp.results[0].incorrect_answers,
        };

        // const shuffledIndexedAnswers = Object.assign(
        //   {},
        //   shuffle([question.correctAnswer, ...question.wrongAnswers])
        // );

        // console.log("ASD", shuffledIndexedAnswers);

        // correctAnswerId = shuffledIndexedAnswers.find(
        //   (answer: any) => answer.value === question.correctAnswer
        // );

        correctAnswer = question.correctAnswer;

        socket.nsp.to(roomCode).emit("question", {
          question: question.question,
          answerOptions: shuffle([
            question.correctAnswer,
            ...question.wrongAnswers,
          ]),
        });
      });
    }
  );
};

export const checkAnswer = (
  socket: GameBoardSocket,
  playerId: string,
  text: string
) => {
  const isCorrect = text === correctAnswer;
  socket.emit("answerResult", isCorrect);
};
