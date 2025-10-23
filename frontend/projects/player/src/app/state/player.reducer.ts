import { createReducer, on } from '@ngrx/store';
import { pause, resume, startGame } from './player.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';
import {
  joinAttempt,
  joinError,
  joinSuccess,
} from '../modules/join/state/join.actions';
import { toggleReadyStatusSuccess } from '../modules/ready/state/ready.actions';

const initialStateGame: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  currentQuestion: { question: '', answer: '', wrongAnswers: [] },
};

const initialStatePlayer: Player = {
  id: '',
  name: '',
  roomCode: '',
  score: 0,
  isReady: false,
};

export const gameReducer = createReducer(
  initialStateGame,
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay }))
);

export const playerReducer = createReducer(
  initialStatePlayer,
  on(joinAttempt, (state, { roomCode, playerName }) => ({
    ...state,
    roomCode,
    playerName,
  })),
  on(joinSuccess, (state, { id }) => ({
    ...state,
    id,
  })),
  on(joinError, (state) => ({
    ...state,
    roomCode: '',
    name: '',
  })),
  on(toggleReadyStatusSuccess, (state) => ({
    ...state,
    isReady: !state.isReady,
  }))
);
