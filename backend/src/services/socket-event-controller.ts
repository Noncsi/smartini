import { Socket } from "socket.io";
import { store } from "../store/config/store";
import {
  createRoom,
  disconnectGameBoard,
  disconnectPlayer,
  evaluateAnswer,
  playerJoins,
  setReady,
  startGame,
} from "../store/game/game.slice";
import {
  GameBoardSocket,
  PlayerSocket,
  RoomCode,
  SocketType,
} from "../store/types/game.types";
import { generatePlayerId, generateRoomCode } from "../utils/id-generators";
import { message, logger } from "../log";

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
        logger.error(message.error.unspecifiedSocketDisconnected(socket.id));
    }
  },
  createRoom(socket: GameBoardSocket) {
    const newRoomCode = generateRoomCode();
    store.dispatch(createRoom({ socket, newRoomCode }));
  },

  playerJoins(
    socket: PlayerSocket,
    roomCode: RoomCode,
    newPlayerName: string,
    newPlayerIconId: number
  ) {
    const newPlayerId = generatePlayerId();
    store.dispatch(
      playerJoins({
        socket,
        roomCode,
        newPlayerId,
        newPlayerName,
        newPlayerIconId,
      })
    );
  },

  setReady(roomCode: RoomCode, playerId: string, isReady: boolean) {
    store.dispatch(setReady({ roomCode, playerId, isReady }));
  },

  startGame(roomCode: RoomCode) {
    store.dispatch(startGame({ roomCode }));
  },

  evaluateAnswer(roomCode: RoomCode, playerId: string, answerId: number) {
    store.dispatch(evaluateAnswer({ roomCode, playerId, answerId }));
  },
};
