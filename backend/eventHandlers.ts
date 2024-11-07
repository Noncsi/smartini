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
  cb: (isJoinSuccess: boolean) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.addPlayer(socket, playerName);
    cb(true);
    Log.success.playerJoined(playerName, roomCode);
  } else {
    cb(false);
    Log.error.roomNotFound();
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

export const setPlayerReadyStatus = (
  socket: PlayerSocket,
  roomCode: RoomCode
) => {
  const room = rooms.get(roomCode);
  if (room) {
    const player = room.players.find(
      (player: Player) => player.socket.id === socket.id
    );
    if (player) {
      player.isReady = !player.isReady;
      socket
        .to(room.gameBoardSocket.id)
        .emit("ready", player.socket.id, player.isReady);
    }

    if (room.players.every((player: Player) => player.isReady)) {
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
