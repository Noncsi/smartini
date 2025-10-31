import { Server } from "socket.io";
import SocketEvent from "../../../shared/socket-event";
import { rooms } from "../app";
import { PlayerSocket, SocketType } from "../types";
import { log } from "../log";

export const joinPlayerToRoom = (
  socket: PlayerSocket,
  roomCode: string,
  playerName: string
) => { 
  const room = rooms.get(roomCode);
  if (!room) {
    log.error.roomNotFound(roomCode);
    socket.emit(SocketEvent.JoinRoomError);
    return;
  }
  
  const player = room.addNewPlayer(socket, playerName);
  if (!player) {
    socket.emit(SocketEvent.JoinRoomError);
    return;
  }

  socket.data.clientType = SocketType.PlayerSocket;

  room.socket.emit(
    SocketEvent.Players,
    [...room.players.values()].map((player) => ({
      id: player.id,
      name: player.name,
      isReady: player.isReady,
    }))
  );
  socket.emit(SocketEvent.JoinRoomSuccess, player.id);
};
