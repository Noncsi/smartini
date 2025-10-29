import { createReducer, on } from '@ngrx/store';
import { pause, resume, startGame } from './player.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';
import {
  joinAttempt,
  joinSuccess,
  joinError,
  toggleReadyStatusSuccess,
} from '../../phases/00-lobby/state/lobby.actions';

const initialGameState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  currentQuestion: { question: '', answer: '', wrongAnswers: [] },
};

const initialPlayerState: Player = {
  id: '',
  name: '',
  score: 0,
  isReady: false,
};

export const gameReducer = createReducer(
  initialGameState,
  on(joinAttempt, (state, { roomCode, playerName }) => ({
    ...state,
    roomCode,
  })),
  on(joinError, (state) => ({
    ...state,
    roomCode: '',
  })),
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay }))
);

export const playerReducer = createReducer(
  initialPlayerState,
  on(joinAttempt, (state, { roomCode, playerName }) => ({
    ...state,
    playerName,
  })),
  on(joinSuccess, (state, { id }) => ({
    ...state,
    id,
  })),
  on(joinError, (state) => ({
    ...state,
    name: '',
  })),
  on(toggleReadyStatusSuccess, (state) => ({
    ...state,
    isReady: !state.isReady,
  }))
);
