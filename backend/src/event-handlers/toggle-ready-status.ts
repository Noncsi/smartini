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
  playerId: string,
  isReady: boolean,
) => {
  const room = rooms.get(roomCode);
  if (!room) {
    log.error.roomNotFound(roomCode);
    return socket.emit(SocketEvent.SetReadyStatusError);
  }

  const player = room.players.get(playerId);
  if (!player) {
    log.error.playerNotFound(playerId);
    return socket.emit(SocketEvent.SetReadyStatusError);
  }

  player.isReady = isReady;
  server.to(room.socket.id).emit(SocketEvent.PlayerSetReady, {
    playerId: player.id,
    isReady: player.isReady,
  });

  log.info.playerStatusSet(player.name, roomCode, player.isReady);

  if ([...room.players.values()].every((player: Player) => player.isReady)) {
    socket.nsp.to(room.roomCode).emit(SocketEvent.StartGame);
  }
};