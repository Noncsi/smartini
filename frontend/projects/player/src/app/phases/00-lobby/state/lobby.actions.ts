import { createAction, props } from '@ngrx/store';

export const connectToSocket = createAction('[Player:Lobby] connect to socket');
export const connectToSocketSuccess = createAction(
  '[Player:Lobby] connect to socket success',
  props<{ roomCode: string; name: string }>()
);
export const connectToSocketError = createAction(
  '[Player:Lobby] connect to socket error'
);

export const joinAttempt = createAction(
  '[Player:Lobby] join attempt',
  props<{ roomCode: string; name: string }>()
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
