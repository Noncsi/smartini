import { createAction, props } from '@ngrx/store';
import { Player } from '../model/player';
import { Question } from './gameboard.reducer';

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
