import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { fetchQuestionsSuccess, emitCurrentQuestion } from '../game.slice';

export const emitFirstQuestionEpic: Epic<GameActions, GameActions, RootState> = (action$, state$) =>
  action$.pipe(
    filter(fetchQuestionsSuccess.match),
    map(({ payload }) => emitCurrentQuestion({ roomCode: payload.roomCode })),
  );
