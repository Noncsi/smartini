import { Epic } from 'redux-observable';
import { filter, mergeMap, from, map, tap } from 'rxjs';
import { mapQuestionApiResponseToQuestions } from '../../../utils/mappers';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { IQuestionApiResponse, Question } from '../../types/game.types';
import { fetchQuestions as fetchQuestions, fetchQuestionsSuccess } from '../game.slice';

export const fetchQuestionsEpic: Epic<GameActions, GameActions, RootState> = action$ =>
  action$.pipe(
    filter(fetchQuestions.match),
    mergeMap(({ payload }) => {
      const { roomCode } = payload;
      return from(
        fetch('https://opentdb.com/api.php?amount=10&type=multiple').then(response =>
          response.json(),
        ),
      ).pipe(
        map((apiResponse: IQuestionApiResponse) => mapQuestionApiResponseToQuestions(apiResponse)),
        map((questions: Question[]) => fetchQuestionsSuccess({ roomCode, questions })),
      );
    }),
  );
