import { createAction, props } from '@ngrx/store';

export const join = createAction(
  '[Player] join',
  props<{ roomCode: string; playerName: string }>()
);
export const joinSuccess = createAction('[Player] join success');
export const joinError = createAction('[Player] join error');

export const pause = createAction('pause');

export const resume = createAction('resume');

export const getRoomCode = createAction(
  'getRoomCode',
  props<{ roomCode: string }>()
);

export const getId = createAction('getId', props<{ id: string }>());

export const toggleReadyStatus = createAction('toggleReadyStatus');

export const startGame = createAction('startGame');
