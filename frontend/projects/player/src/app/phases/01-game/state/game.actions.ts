import { QuestionPrompt } from '@models/question';
import { createAction, props } from '@ngrx/store';

export const pause = createAction('pause');

export const resume = createAction('resume');

export const startGame = createAction('startGame');

export const getQuestionSuccess = createAction(
  '[Player:Game] get question success',
  props<{ payload: QuestionPrompt }>()
);

export const emitAnswer = createAction(
  '[Player:Game] emit answer',
  props<{ answer: string }>()
);
