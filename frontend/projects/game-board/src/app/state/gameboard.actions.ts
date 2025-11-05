import { Player } from '@models/player';
import { QuestionPrompt } from '@models/question';
import { createAction, props } from '@ngrx/store';

export const pause = createAction('pause');
export const resume = createAction('resume');

export const receivePlayers = createAction(
  'receivePlayers',
  props<{ players: Player[] }>()
);

export const createRoomSuccess = createAction(
  'receiveRoomCode',
  props<{ roomCode: string }>()
);

export const setPlayerReadyStatus = createAction(
  'setPlayerReadyStatus',
  props<{ playerId: string; isReady: boolean }>()
);

export const startGame = createAction('startGame');

export const getQuestion = createAction('getQuestion');

export const askQuestion = createAction(
  'askQuestion',
  props<{ question: QuestionPrompt }>()
);
