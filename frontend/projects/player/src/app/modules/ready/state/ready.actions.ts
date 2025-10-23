import { createAction } from '@ngrx/store';

export const toggleReadyStatusAttempt = createAction(
  '[Player:Ready] toggle ready status'
);
export const toggleReadyStatusSuccess = createAction(
  '[Player:Ready] toggle ready status success'
);
export const toggleReadyStatusError = createAction(
  '[Player:Ready] toggle ready status error'
);
