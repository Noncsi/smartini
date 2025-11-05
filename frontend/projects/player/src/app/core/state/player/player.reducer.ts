import { createReducer, on } from '@ngrx/store';
import { Player } from '@models/player';
import {
  joinAttempt,
  joinSuccess,
  joinError,
  setReadyStatusAttempt,
  setReadyStatusError,
} from '../../../phases/00-lobby/state/lobby.actions';

const initialPlayerState: Player = {
  id: '',
  name: '',
  score: 0,
  isReady: false,
};

export const playerReducer = createReducer(
  initialPlayerState,
  on(joinAttempt, (state, { roomCode, name }) => ({
    ...state,
    name,
  })),
  on(joinSuccess, (state, { id }) => ({
    ...state,
    id,
  })),
  on(joinError, (state) => ({
    ...state,
    name: '',
  })),
  on(setReadyStatusAttempt, (state, { isReady }) => ({
    ...state,
    isReady,
  })),
  on(setReadyStatusError, (state) => ({
    ...state,
    isReady: false,
  }))
);
