import { createReducer, on } from '@ngrx/store';
import { Game, GamePhase } from '@models/game';
import {
  joinAttempt,
  joinError,
} from '../../../phases/00-lobby/state/lobby.actions';
import {
  countdown,
  getQuestionSuccess,
  pause,
  resume,
  startGame,
} from '../../../phases/01-game/state/game.actions';

const initialGameState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
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
