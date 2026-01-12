import { createAction, props } from '@ngrx/store';
import { JoinForm } from '../../services/lobby.service';

export const connectToSocket = createAction('[Player:Lobby] connect to socket');
export const connectToSocketSuccess = createAction(
  '[Player:Lobby] connect to socket success',
  props<{ roomCode: string; name: string; iconId: number }>()
);
export const connectToSocketError = createAction(
  '[Player:Lobby] connect to socket error'
);

export const joinAttempt = createAction(
  '[Player:Lobby] join attempt',
  props<{ joinForm: Partial<JoinForm> }>()
);
export const joinSuccess = createAction(
  '[Player:Lobby] join success',
  props<{ id: string }>()
);
export const joinError = createAction('[Player:Lobby] join error');

export const getHostPlayerId = createAction(
  '[Player:Lobby] get host player id',
  props<{ id: string }>()
);

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

export const startGame = createAction(
  '[Player:Lobby] start game'
);

export const startGameSuccess = createAction(
  '[Player:Lobby] start game success'
);
