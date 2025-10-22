import { createReducer, on } from '@ngrx/store';
import {
  getId,
  getRoomCode,
  joinToRoom,
  pause,
  resume,
  startGame,
  toggleReadyStatus,
} from './player.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';

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
  on(getRoomCode, (state, { roomCode }) => ({ ...state, roomCode })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay }))
);

export const playerReducer = createReducer(
  initialStatePlayer,
  on(getId, (state, { id }) => ({ ...state, id })),
  on(joinToRoom, (state, { roomCode, playerName }) => ({
    ...state,
    roomCode,
    name: playerName,
  })),
  on(toggleReadyStatus, (state) => ({ ...state, isReady: !state.isReady }))
);
