import { Player } from '@models/player';
import { QuestionPrompt } from '@models/question';
import { createAction, props } from '@ngrx/store';

export const pause = createAction('pause');
export const resume = createAction('resume');

export const receivePlayers = createAction('receivePlayers', props<{ players: Player[] }>());

export const receiveHostPlayerId = createAction(
  'receiveHostPlayerId',
  props<{ hostPlayerId: string }>(),
);

export const createRoomSuccess = createAction('receiveRoomCode', props<{ roomCode: string }>());

export const setPlayerReadyStatus = createAction(
  'setPlayerReadyStatus',
  props<{ playerId: string; isReady: boolean }>(),
);

export const startGameSuccess = createAction('startGame');

export const countdown = createAction('countdown', props<{ number: number }>());

export const answerRevealCountdown = createAction(
  'answerRevealCountdown',
  props<{ number: number }>(),
);

export const getQuestion = createAction('getQuestion');

export const askQuestion = createAction('askQuestion', props<{ question: QuestionPrompt }>());

export const showCorrectAnswer = createAction('showCorrectAnswer', props<{ id: number }>());

export const end = createAction('end', props<{ winnerPlayerId: string }>());
