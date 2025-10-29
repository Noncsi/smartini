import { createAction, props } from '@ngrx/store';

export const joinAttempt = createAction(
  '[Player:Lobby] join attempt',
  props<{ roomCode: string; playerName: string }>()
);
export const joinSuccess = createAction(
  '[Player:Lobby] join success',
  props<{ id: string }>()
);
export const joinError = createAction('[Player:Lobby] join error');

export const toggleReadyStatusAttempt = createAction(
  '[Player:Lobby] toggle ready status'
);
export const toggleReadyStatusSuccess = createAction(
  '[Player:Lobby] toggle ready status success'
);
export const toggleReadyStatusError = createAction(
  '[Player:Lobby] toggle ready status error'
);
