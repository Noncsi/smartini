import { createAction, props } from '@ngrx/store';

export const joinToRoom = createAction(
  'joinToRoom',
  props<{ roomCode: string; playerName: string }>()
);

export const pause = createAction('pause');

export const resume = createAction('resume');

export const getRoomCode = createAction(
  'getRoomCode',
  props<{ roomCode: string }>()
);

export const getId = createAction('getId', props<{ id: string }>());

export const toggleReadyStatus = createAction('toggleReadyStatus');

export const startGame = createAction('startGame');
