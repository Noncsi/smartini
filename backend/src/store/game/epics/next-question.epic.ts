import { Epic } from 'redux-observable';
import { filter, map, delay, withLatestFrom, tap, ignoreElements, first } from 'rxjs';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { emitCurrentQuestion, emitScores, fetchQuestions } from '../game.slice';
import SocketEvent from '../../../../../shared/socket-event';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import { selectRoomByCode } from '../game.selectors';

export const nextQuestionEpic: Epic<GameActions, GameActions, RootState> = action$ =>
  action$.pipe(
    filter(emitScores.match),
    delay(3000),
    map(({ payload }) => emitCurrentQuestion({ roomCode: payload.roomCode })),
  );

export const emitScoresEpic: Epic<GameActions, GameActions, RootState> = (action$, state$) =>
  action$.pipe(
    filter(emitScores.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      const room = selectRoomByCode(state.game, payload.roomCode);
      gameBoardSocket!.nsp.to(roomCode).emit(SocketEvent.Players, room!.players);
    }),
    ignoreElements(),
  );
