import { createAction, props } from '@ngrx/store';

export const pause = createAction('pause');

export const resume = createAction('resume');

export const getRoomCode = createAction(
  'getRoomCode',
  props<{ roomCode: string }>()
);

export const setReadyStatus = createAction(
  'setReadyStatus',
  props<{ id: string; isReady: boolean }>()
);

export const startGame = createAction('startGame');
