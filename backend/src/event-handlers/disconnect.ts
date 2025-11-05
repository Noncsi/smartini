import { Socket } from "socket.io";
import { SocketType } from "../types";
import { log } from "../log";
import { rooms } from "../app";
import SocketEvent from "../../../shared/socket-event";

export const disconnect = (socket: Socket): void => {
  switch (socket.data.clientType) {
    case SocketType.GameboardSocket:
      log.info.gameBoardDisconnected(socket.id);
      break;
    case SocketType.PlayerSocket:
      const room = rooms.get(socket.data.roomCode);
      if (!room) break;
      const disconnectedPlayer = room?.players.get(socket.data.playerId);
      if (!disconnectedPlayer) break;

      room.players.delete(disconnectedPlayer.id);
      room.socket.emit(
        SocketEvent.Players,
        [...room.players.values()].map((player) => ({
          id: player.id,
          name: player.name,
          isReady: player.isReady,
        }))
      );
      log.info.playerDisconnected(
        disconnectedPlayer.name,
        socket.data.roomCode,
        socket.id
      );
      break;
    default:
      log.error.unspecifiedSocketDisconnected(socket.id);
  }
};
