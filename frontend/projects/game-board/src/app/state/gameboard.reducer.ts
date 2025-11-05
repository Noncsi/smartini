import { createReducer, on } from '@ngrx/store';
import {
  receivePlayers,
  createRoomSuccess,
  pause,
  resume,
  setPlayerReadyStatus,
  startGame,
  askQuestion,
} from './gameboard.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';

const initialState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  currentQuestion: { question: '', options: [] },
};

export const gameReducer = createReducer(
  initialState,
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(createRoomSuccess, (state, { roomCode }) => ({ ...state, roomCode })),
  on(receivePlayers, (state, { players }) => ({ ...state, players })),
  on(setPlayerReadyStatus, (state, { playerId, isReady }) => {
    const playerIdx = state.players.findIndex(
      (player: Player) => player.id === playerId
    );

    const players = state.players.map((player: Player) =>
      player.id === state.players[playerIdx].id
        ? { ...player, isReady }
        : player
    );

    return { ...state, players };
  }),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay })),
  on(askQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  }))
);
