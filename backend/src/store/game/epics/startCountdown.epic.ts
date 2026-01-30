import { Epic } from "redux-observable";
import {
  filter,
  timer,
  map,
  takeWhile,
  tap,
  mergeMap,
  last,
} from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { startCountdown, fetchQuestion } from "../game.slice";
import { gameBoardSocketMap } from "../../../services/socket-registry";

export const startCountdownEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
) =>
  action$.pipe(
    filter(startCountdown.match),
    map(({ payload }) => ({
      roomCode: payload.roomCode,
      socket: gameBoardSocketMap.get(payload.roomCode),
      countFrom: payload.countFrom,
    })),
    filter(({ socket }) => Boolean(socket)),
    filter(({ countFrom }) => countFrom > 0),
    mergeMap(({ socket, roomCode, countFrom }) => {
      return timer(0, 1000).pipe(
        map((n) => countFrom - n),
        takeWhile((n) => n >= 0),
        tap((n) => socket?.nsp.to(roomCode).emit(SocketEvent.Countdown, n)),
        last(),
        map(() => roomCode),
      );
    }),
    map((roomCode) => fetchQuestion({ roomCode })),
  );
