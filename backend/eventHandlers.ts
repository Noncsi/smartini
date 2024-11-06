import { GamePad } from "./model/gamePad";
import ShortUniqueId from "short-unique-id";
import { Socket } from "socket.io";
import { Player } from "./model/player";
import { Log } from "./log";
import { Room, RoomCode } from "./model/room";
import { rooms } from "./app";

type GameBoardSocket = Socket;
type GamePadSocket = Socket;
type QuestionResponse = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

export const disconnect = (socket: GameBoardSocket | GamePadSocket) => {
  // make diff between board closing and player quitting
  const isGameBoard = Array.from(rooms.values()).some(
    (room: Room) => room.gameBoardSocket.id === socket.id
  );
  const isGamePad = Array.from(rooms.values()).some((room: Room) =>
    room.gamePads.find((gamePad: GamePad) => gamePad.socket.id === socket.id)
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
  } else if (isGamePad) {
    const room = Array.from(rooms.values()).find((room: Room) =>
      room.gamePads.find((gamePad: GamePad) => gamePad.socket.id === socket.id)
    );
    if (room) {
      // pauses game
      room.isPaused = true;
      // send board an option for continue without disconnected player (stays in room, but freezed)
      room.gameBoardSocket.to(room.code).emit("playerDisconnected");

      // automatically continues upon reconnect
      // disconnected player's pad jumps back to join game view
      // freeze player
      const disconnectedPlayer =
        room.gamePads.find(
          (gamePad: GamePad) => gamePad.socket.id === socket.id
        )?.player.name ?? "";
      Log.info.gamePadDisconnected(disconnectedPlayer);
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

export const connectGamePad = (
  roomCodeForReconnect: RoomCode,
  cb: (isReconnect: boolean) => {}
) => {
  rooms.has(roomCodeForReconnect) ? cb(true) : cb(false);
};

export const joinGamePadToRoom = (
  socket: GamePadSocket,
  roomCode: string,
  playerName: string,
  cb: (isJoinSuccess: boolean) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.addGamePad(socket, playerName);
    cb(true);
    Log.success.playerJoined(playerName, roomCode);
  } else {
    cb(false);
    Log.error.roomNotFound();
  }
};

export const reJoinGamePadToRoom = (
  socket: GamePadSocket,
  roomCode: string,
  playerId: string,
  cb: (isJoinSuccess: any) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.reconnectGamePad(playerId);
    cb(true);
    Log.success.playerJoined(playerId, roomCode);
  } else {
    cb(false);
    Log.error.roomNotFound();
  }
};

export const setPlayerReadyStatus = (
  socket: GamePadSocket,
  roomCode: RoomCode
) => {
  const room = rooms.get(roomCode);
  if (room) {
    const gamePad = room.gamePads.find(
      (gamePad: GamePad) => gamePad.socket.id === socket.id
    );
    if (gamePad) {
      gamePad.player.isReady = !gamePad.player.isReady;
      socket
        .to(room.gameBoardSocket.id)
        .emit("ready", gamePad.socket.id, gamePad.player.isReady);
    }

    if (room.gamePads.every((gamePad: GamePad) => gamePad.player.isReady)) {
      socket.nsp.to(room.code).emit("startGame");
      console.log(`Game has started in room: ${roomCode}`);
    }
  }
};

export const getQuestion = (socket: GameBoardSocket, roomCode: RoomCode) => {
  console.log(roomCode);
  fetch("https://opentdb.com/api.php?amount=1&type=multiple").then(
    (response) => {
      response.json().then((resp) => {
        const question: QuestionResponse = {
          question: resp.results[0].question,
          correctAnswer: resp.results[0].correct_answer,
          wrongAnswers: resp.results[0].incorrect_answers,
        };
        socket.nsp.to(roomCode).emit("question", question);
      });
    }
  );
};
