import { createReducer, on } from '@ngrx/store';
import { Player } from '@models/player';
import { getQuestionSuccess, emitAnswer } from '../actions/game.actions';
import { joinAttempt, joinSuccess, joinError, setReadyStatusAttempt, setReadyStatusError } from '../actions/lobby.actions';

const initialPlayerState: Player = {
  id: '',
  name: '',
  iconId: 0,
  score: 0,
  isReady: false,
  didAnswerCurrentQuestion: false,
  chosenAnswerId: 0,
};

export const playerReducer = createReducer(
  initialPlayerState,
  on(joinAttempt, (state, { joinForm }) => ({
    ...state,
    name: joinForm.name!,
    iconId: joinForm.iconId!,
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
