import { Epic } from "redux-observable";
import {
  filter,
  timer,
  map,
  takeWhile,
  tap,
  concatMap,
  ignoreElements,
} from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { startGame } from "../game.slice";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { log } from "../../../log";

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
    concatMap(({ socket, roomCode }) => {
      tap(() => {
        socket?.nsp.to(roomCode).emit(SocketEvent.StartGameSuccess);
        log.info.gameStarted(roomCode);
      });
      return timer(0, 1000).pipe(
        map((n) => 2 - n),
        takeWhile((n) => n >= 0),
        tap((n) => socket?.nsp.to(roomCode).emit(SocketEvent.Countdown, n))
      );
    }),
    ignoreElements()
  );
