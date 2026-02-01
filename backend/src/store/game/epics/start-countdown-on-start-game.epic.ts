import { Epic } from "redux-observable";
import { filter, map, tap } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { startCountdown, startGame } from "../game.slice";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { logger, message } from "../../../log";

export const startCountdownOnStartGameEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(startGame.match),
    map(({ payload }) => ({
      socket: gameBoardSocketMap.get(payload.roomCode),
      roomCode: payload.roomCode,
    })),
    filter(({ socket }) => Boolean(socket)),
    tap(({ socket, roomCode }) => {
      socket?.nsp.to(roomCode).emit(SocketEvent.StartGameSuccess);
      logger.info(message.info.gameStarted(roomCode));
    }),
    map(({ roomCode }) => startCountdown({ roomCode, countFrom: 5 })),
  );
