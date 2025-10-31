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

export const setReadyStatusAttempt = createAction(
  '[Player:Lobby] set ready status attempt',
  props<{ isReady: boolean }>()
);
export const setReadyStatusSuccess = createAction(
  '[Player:Lobby] set ready status success'
);
export const setReadyStatusError = createAction(
  '[Player:Lobby] set ready status error'
);
