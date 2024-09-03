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

// export const disconnect = (socket: GameBoardSocket | GamePadSocket) => {
//   // make diff between board closing and player quitting
//   const room = Array.from(rooms.values()).find(
//     (room: Room) => room.id === socket.id
//   );

//   const player = Array.from(rooms.values()).find((room: Room) =>
//     room.players.find((player: Player) => player.id === socket.id)
//   );
//   if (room !== undefined && player === undefined) {
//     // it's a board
//     room.players.forEach((player: Player) => {
//       // socket.d;
//     });
//     rooms.delete(room.code);
//   }
//   if (room === undefined && player !== undefined) {
//     // it's a player
//   }
// };

export const createRoom = (socket: GameBoardSocket) => {
  const roomCode: RoomCode = new ShortUniqueId({ length: 4 })
    .rnd()
    .toUpperCase();
  rooms.set(roomCode, new Room(socket.id, roomCode, socket));
  Log.success.gameBoardCreated(roomCode);
};

export const connectGamePad = (
  socket: GamePadSocket,
  roomCode: string,
  playerName: string,
  cb: (isJoinSuccess: boolean) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.addPlayer(socket.id, playerName);
    socket.join(roomCode);
    socket.to(room?.gameBoardSocket.id ?? "").emit("players", room?.players);
    cb(true); // send
    Log.success.playerJoined(playerName, roomCode);
  } else {
    Log.error.roomNotFound();
  }
};

export const setPlayerReadyStatus = (
  socket: GamePadSocket,
  roomCode: RoomCode
) => {
  const room = rooms.get(roomCode);
  if (room) {
    const player = room.players.find(
      (player: Player) => player.id === socket.id
    );
    if (player) {
      player.isReady = !player.isReady;
      socket
        .to(room.gameBoardSocket.id)
        .emit("ready", player.id, player.isReady);
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
