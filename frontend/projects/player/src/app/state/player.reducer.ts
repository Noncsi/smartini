import { createReducer, on } from '@ngrx/store';
import { getRoomCode, pause, resume, startGame } from './player.actions';
import { Game, GamePhase } from '@models/game';

const initialState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  currentQuestion: { question: '', answer: '', wrongAnswers: [] },
};

export const gameReducer = createReducer(
  initialState,
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(getRoomCode, (state, { roomCode }) => ({ ...state, roomCode })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay }))
);
