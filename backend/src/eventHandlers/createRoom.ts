import SocketEvent from "../../../shared/socket-event";
import { rooms } from "../app";
import { Room } from "../models/room";
import { GameBoardSocket, RoomCode, SocketType } from "../types";
import { generateRoomCode } from "../utils";

export const createRoom = (socket: GameBoardSocket): void => {
  const roomCode: RoomCode = generateRoomCode();
  rooms.set(roomCode, new Room(roomCode, socket));
  socket.data.clientType = SocketType.GameboardSocket;
  socket.emit(SocketEvent.CreateRoomSuccess, roomCode);
};