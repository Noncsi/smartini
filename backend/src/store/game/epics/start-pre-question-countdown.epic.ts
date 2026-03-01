import { Epic } from 'redux-observable';
import { filter, timer, map, takeWhile, tap, mergeMap, last } from 'rxjs';
import SocketEvent from '../../../../../shared/socket-event';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { countdownBeforeQuestion, fetchQuestions } from '../game.slice';
import { gameBoardSocketMap } from '../../../services/socket-registry';

export const startPreQuestionCountdownEpic: Epic<GameActions, GameActions, RootState> = action$ =>
  action$.pipe(
    filter(countdownBeforeQuestion.match),
    map(({ payload }) => ({
      roomCode: payload.roomCode,
      socket: gameBoardSocketMap.get(payload.roomCode),
    })),
    filter(({ socket }) => Boolean(socket)),
    mergeMap(({ socket, roomCode }) =>
      timer(0, 1000).pipe(
        map(n => 10 - n),
        takeWhile(n => n >= 0),
        tap(n => socket?.nsp.to(roomCode).emit(SocketEvent.Countdown, n)),
        last(),
        map(() => roomCode),
      ),
    ),
    map(roomCode => fetchQuestions({ roomCode })),
  );
