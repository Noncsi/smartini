import { Server } from "socket.io";
import SocketEvent from "../../../shared/socket-event";
import { rooms } from "../app";
import { Player } from "../models/player";
import { PlayerSocket, RoomCode } from "../types";
import { log } from "../log";

export const toggleReadyStatus = (
  socket: PlayerSocket,
  server: Server,
  roomCode: RoomCode,
  playerId: string
) => {
  const room = rooms.get(roomCode);
  if (!room) {
    log.error.roomNotFound(roomCode);
    return socket.emit(SocketEvent.ToggleReadyStatusError);
  }

  const player = room.players.get(playerId);
  if (!player) {
    log.error.playerNotFound(playerId);
    return socket.emit(SocketEvent.ToggleReadyStatusError);
  }

  player.isReady = !player.isReady;
  server.to(room.socket.id).emit(SocketEvent.PlayerSetReady, {
    playerId: player.id,
    isReady: player.isReady,
  });

  server.emit(SocketEvent.ToggleReadyStatusSuccess, player.id, player.isReady);

  if ([...room.players.values()].every((player: Player) => player.isReady)) {
    socket.nsp.to(room.roomCode).emit("startGame");
  }
};