import { Server } from "socket.io";
import SocketEvent from "../../../shared/socket-event";
import { rooms } from "../app";
import { PlayerSocket, SocketType } from "../types";
import { log } from "../log";

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

  socket.data.clientType = SocketType.PlayerSocket;
  server.emit(SocketEvent.JoinRoomSuccess, player.id);
};