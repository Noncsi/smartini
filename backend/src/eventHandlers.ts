import ShortUniqueId from "short-unique-id";
import { Socket } from "socket.io";
import { Log } from "./log";
import { Room, RoomCode } from "./model/room";
import { rooms } from "./app";
import { Player } from "./model/player";

type GameBoardSocket = Socket;
type PlayerSocket = Socket;
type QuestionResponse = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

let correctAnswer: string;

export const disconnect = (socket: GameBoardSocket | PlayerSocket) => {
  // make diff between board closing and player quitting
  const isGameBoard = Array.from(rooms.values()).some(
    (room: Room) => room.gameBoardSocket.id === socket.id
  );
  const isPlayer = Array.from(rooms.values()).some((room: Room) =>
    room.players.find((player: Player) => player.socket.id === socket.id)
  );

  if (isGameBoard) {
    const room = Array.from(rooms.values()).find(
      (room: Room) => room.gameBoardSocket.id === socket.id
    );
    if (room) {
      // pause game
      room.isPaused = true;
      // send players a message that the board disconected
      room.gameBoardSocket.to(room.code).emit("roomDisconnected");
      // button for "close room / end game" if players want to finish
      // automatically continues upon reconnect
      Log.info.gameBoardDisconnected(room.code);
    }
  } else if (isPlayer) {
    const room = Array.from(rooms.values()).find((room: Room) =>
      room.players.find((player: Player) => player.socket.id === socket.id)
    );
    if (room) {
      // pauses game
      room.isPaused = true;
      // send board an option for continue without disconnected player (stays in room, but freezed)
      room.gameBoardSocket.to(room.code).emit("playerDisconnected");

      // automatically continues upon reconnect
      // disconnected player jumps back to join game view
      // freeze player
      const disconnectedPlayer =
        room.players.find((player: Player) => player.socket.id === socket.id)
          ?.name ?? "";
      Log.info.playerDisconnected(disconnectedPlayer);
    }
  } else {
    // socket couldn't be identified
  }
};

export const createRoom = (socket: GameBoardSocket) => {
  const roomCode: RoomCode = new ShortUniqueId({ length: 4 })
    .rnd()
    .toUpperCase();
  rooms.set(roomCode, new Room(roomCode, socket));
  Log.success.gameBoardCreated(roomCode);
};

export const connectPlayer = (
  roomCodeForReconnect: RoomCode,
  cb: (isReconnect: boolean) => {}
) => {
  rooms.has(roomCodeForReconnect) ? cb(true) : cb(false);
};

export const joinPlayerToRoom = (
  socket: PlayerSocket,
  roomCode: string,
  playerName: string,
  cb: (newPlayerId: string | null) => void
) => {
  const room = rooms.get(roomCode);
  if (!room) {
    cb(null);
    Log.error.roomNotFound();
    return;
  }

  const newPlayer = room.addPlayer(socket, playerName);
  if (newPlayer) {
    cb(newPlayer.id);
    Log.success.playerJoined(playerName, roomCode);
  } else {
    cb(null); // name already taken
  }
};

export const reJoinPlayerToRoom = (
  socket: PlayerSocket,
  roomCode: string,
  playerId: string,
  cb: (isJoinSuccess: any) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.reconnectPlayer(playerId);
    cb(true);
    Log.success.playerJoined(playerId, roomCode);
  } else {
    cb(false);
    Log.error.roomNotFound();
  }
};

export const toggleReadyStatus = (
  socket: PlayerSocket,
  playerId: string,
  roomCode: RoomCode
) => {
  const room = rooms.get(roomCode);
  if (!room) return socket.emit(SocketEvent.ToggleReadyStatusError);
  const player = room.players.find((player: Player) => player.id === playerId);
  if (!player) return socket.emit(SocketEvent.ToggleReadyStatusError);
      player.isReady = !player.isReady;
      socket // tell the gameBoard who clicked ready
        .to(room.gameBoardSocket.id)
        .emit("ready", player.id, player.isReady);

  socket.emit(SocketEvent.ToggleReadyStatusSuccess, player.id, player.isReady);

    if (room.players.every((player: Player) => player.isReady)) {
      socket.nsp.to(room.code).emit("startGame");
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
