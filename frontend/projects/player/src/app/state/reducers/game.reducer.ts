import { createReducer, on } from '@ngrx/store';
import { GameState } from '@models/game';
import {
  arePlayersReady,
  getHostPlayerId,
  joinAttempt,
  joinError,
  startGameSuccess,
} from '../actions/lobby.actions';
import { pause, resume, getQuestionSuccess, countdown } from '../actions/game.actions';
import { GameStage } from '../../../../../../../shared/types';

export interface PlayerGameState extends GameState {
  arePlayersReady: boolean;
}

const initialGameState: PlayerGameState = {
  stage: GameStage.lobby,
  roomCode: '',
  isPaused: false,
  hostPlayerId: '',
  arePlayersReady: false,
  countdown: -1,
  currentQuestion: { question: '', answerOptions: [] },
  currentCorrectAnswerId: 0,
};

export const gameReducer = createReducer(
  initialGameState,
  on(joinAttempt, (state, { joinForm }) => ({
    ...state,
    roomCode: joinForm.roomCode!,
  })),
  on(joinError, (state, { errorMessage }) => ({
    ...state,
    roomCode: '',
    errorMessage,
  })),
  on(getHostPlayerId, (state, { id }) => ({ ...state, hostPlayerId: id })),
  on(pause, state => ({ ...state, isPaused: true })),
  on(resume, state => ({ ...state, isPaused: false })),
  on(arePlayersReady, (state, { areReady }) => ({
    ...state,
    arePlayersReady: areReady,
  })),
  on(startGameSuccess, state => ({ ...state, stage: GameStage.game })),
  on(getQuestionSuccess, (state, { payload }) => ({
    ...state,
    currentQuestion: {
      question: payload.question,
      answerOptions: payload.answerOptions,
    },
  })),
  on(countdown, (state, { number }) => ({ ...state, countdown: number })),
);
