import { createAction, props } from '@ngrx/store';
import { Player, Question } from './gameboard.reducer';

export const pause = createAction('pause');

export const resume = createAction('resume');

export const getPlayers = createAction(
  'getPlayers',
  props<{ players: Player[] }>()
);

export const getRoomCode = createAction(
  'getRoomCode',
  props<{ roomCode: string }>()
);

export const setPlayerReadyStatus = createAction(
  'setPlayerReadyStatus',
  props<{ playerId: string; isReady: boolean }>()
);

export const startGame = createAction('startGame');

export const askQuestion = createAction(
  'askQuestion',
  props<{ question: Question }>()
);
