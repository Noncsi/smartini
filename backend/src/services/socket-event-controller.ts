import { Socket } from "socket.io";
import { store } from "../store/config/store";
import {
  createRoom,
  disconnectGameBoard,
  disconnectPlayer,
  playerJoins,
  setReady,
} from "../store/game/game.slice";
import {
  GameBoardSocket,
  PlayerSocket,
  RoomCode,
  SocketType,
} from "../store/types/game.types";
import { generatePlayerId, generateRoomCode } from "../utils/id-generators";
import { log } from "../log";

export const SocketEventController = {
  disconnect(socket: Socket) {
    switch (socket.data.clientType) {
      case SocketType.GameboardSocket:
        store.dispatch(disconnectGameBoard({ socket }));
        break;
      case SocketType.PlayerSocket:
        store.dispatch(disconnectPlayer({ socket }));
        break;
      default:
        log.error.unspecifiedSocketDisconnected(socket.id);
    }
  },
  createRoom(socket: GameBoardSocket) {
    const newRoomCode = generateRoomCode();
    store.dispatch(createRoom({ socket, newRoomCode }));
  },

  playerJoins(
    socket: GameBoardSocket,
    roomCode: RoomCode,
    newPlayerName: string
  ) {
    const newPlayerId = generatePlayerId();
    store.dispatch(
      playerJoins({ socket, roomCode, newPlayerId, newPlayerName })
    );
  },

  setReady(
    roomCode: RoomCode,
    playerId: string,
    isReady: boolean
  ) {
    store.dispatch(setReady({ roomCode, playerId, isReady }));
  },
};
