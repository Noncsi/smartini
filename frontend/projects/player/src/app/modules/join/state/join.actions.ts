import { createAction, props } from '@ngrx/store';

export const joinAttempt = createAction(
  '[Player:Join] join attempt',
  props<{ roomCode: string; playerName: string }>()
);
export const joinSuccess = createAction(
  '[Player:Join] join success',
  props<{ id: string }>()
);
export const joinError = createAction('[Player:Join] join error');
