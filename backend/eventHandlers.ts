import ShortUniqueId from "short-unique-id";
import { Socket } from "socket.io";
import { rooms } from "./state";

export const connectGameBoard = (socket: Socket) => {
  const roomCode = new ShortUniqueId({ length: 4 }).rnd().toUpperCase();
  rooms.add(roomCode);
  socket.join(roomCode);
  socket.emit("roomCreated", roomCode);
  console.log(`\x1b[32m`, `Host has been created in room: ${roomCode}`);
};

export const connectGamePad = (
  socket: Socket,
  roomCode: string,
  playerName: string
) => {
  const isRoomExist = rooms.has(roomCode);
  if (isRoomExist) {
    socket.join(roomCode);
    socket.to(roomCode).emit("newPlayer", playerName);
    console.log(`\x1b[32m`, `${playerName} has joined to room: ${roomCode}.`);
  } else {
    console.log(`\x1b[31m`, `Room was not found.`);
  }
};
