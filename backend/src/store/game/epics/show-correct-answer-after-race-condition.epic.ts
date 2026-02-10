import { Epic } from 'redux-observable';
import {
  filter,
  map,
  tap,
  withLatestFrom,
  race,
  timer,
  ignoreElements,
  interval,
  takeWhile,
  last,
  mergeMap,
  take,
} from 'rxjs';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { emitScores, sendQuestionSuccess } from '../game.slice';
import { selectRoomByCode } from '../game.selectors';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import SocketEvent from '../../../../../shared/socket-event';

export const showCorrectAnswerAfterRaceConditionEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(sendQuestionSuccess.match),
    withLatestFrom(state$),
    map(([{ payload }, state]) => ({
      room: selectRoomByCode(state.game, payload.roomCode),
      socket: gameBoardSocketMap.get(payload.roomCode),
    })),
    filter(({ room, socket }) => Boolean(room) && Boolean(socket)),
    mergeMap(({ socket, room }) => {
      const allPlayersAnswered$ = state$.pipe(
        map(state => selectRoomByCode(state.game, room!.roomCode)!.players),
        map(players => players.every(p => p.hasAnswered)),
        filter(Boolean),
        take(1),
      );

      const timeout$ = interval(1000).pipe(
        map(n => 10 - n),
        takeWhile(n => n >= 0),
        tap(n => socket!.nsp.to(room!.roomCode).emit(SocketEvent.AnswerRevealCountdown, n)),
        last(),
      );

      return race(timeout$, allPlayersAnswered$).pipe(
        map(() => {
          socket?.nsp
            .to(room!.roomCode)
            .emit(SocketEvent.ShowCorrectAnswer, room!.currentQuestion!.correctAnswerId);
          return room!.roomCode;
        }),
      );
    }),
    map(roomCode => emitScores({ roomCode })),
  );
