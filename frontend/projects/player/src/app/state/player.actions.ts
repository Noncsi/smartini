import { createAction, props } from '@ngrx/store';

// JOIN
export const joinAttempt = createAction(
  '[Player] join',
  props<{ roomCode: string; playerName: string }>()
);
export const joinSuccess = createAction(
  '[Player] join success',
  props<{ id: string }>()
);
export const joinError = createAction('[Player] join error');

// READY
export const toggleReadyStatusAttempt = createAction(
  '[Player] toggle ready status'
);
export const toggleReadyStatusSuccess = createAction(
  '[Player] toggle ready status success'
);
export const toggleReadyStatusError = createAction(
  '[Player] toggle ready status error'
);

export const pause = createAction('pause');

export const resume = createAction('resume');

export const startGame = createAction('startGame');
