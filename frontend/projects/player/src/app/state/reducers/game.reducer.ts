import { createReducer, on } from '@ngrx/store';
import { Game, GamePhase } from '@models/game';
import { getHostPlayerId, joinAttempt, joinError } from '../actions/lobby.actions';
import { pause, resume, startGame, getQuestionSuccess, countdown } from '../actions/game.actions';

const initialGameState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  hostPlayerId: '',
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
  on(joinError, (state) => ({
    ...state,
    roomCode: '',
  })),
  on(getHostPlayerId, (state, { id }) => ({ ...state, hostPlayerId: id })),
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay })),
  on(getQuestionSuccess, (state, { payload }) => ({
    ...state,
    currentQuestion: {
      question: payload.question,
      answerOptions: payload.answerOptions,
    },
  })),
  on(countdown, (state, { number }) => ({ ...state, countdown: number }))
);
