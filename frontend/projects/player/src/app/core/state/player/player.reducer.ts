import { createReducer, on } from '@ngrx/store';
import { Player } from '@models/player';
import {
  joinAttempt,
  joinSuccess,
  joinError,
  setReadyStatusAttempt,
  setReadyStatusError,
} from '../../../phases/00-lobby/state/lobby.actions';
import {
  emitAnswer,
  getQuestionSuccess,
} from '../../../phases/01-game/state/game.actions';

const initialPlayerState: Player = {
  id: '',
  name: '',
  score: 0,
  isReady: false,
  didAnswerCurrentQuestion: false,
  chosenAnswerId: 0,
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
  })),
  on(getQuestionSuccess, (state, { payload }) => ({
    ...state,
    didAnswerCurrentQuestion: false,
    chosenAnswerId: 0,
  })),
  on(emitAnswer, (state, { answerId }) => ({
    ...state,
    didAnswerCurrentQuestion: true,
    chosenAnswerId: answerId,
  }))
);
