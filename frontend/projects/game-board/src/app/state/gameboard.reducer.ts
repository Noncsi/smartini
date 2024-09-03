import { createReducer, on } from '@ngrx/store';
import {
  askQuestion,
  getPlayers,
  getRoomCode,
  setPlayerReadyStatus,
  startGame,
} from './gameboard.actions';
import { Player } from '../model/player';

export interface Game {
  phase: GamePhase;
  roomCode: string;
  players: Player[];
  currentQuestion: Question;
}

export enum GamePhase {
  lobby,
  gamePlay,
  result,
}

export interface Question {
  question: string;
  answer: string;
  wrongAnswers: string[];
}

const initialState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  players: [],
  currentQuestion: { question: '', answer: '', wrongAnswers: [] },
};

export const gameReducer = createReducer(
  initialState,
  on(getRoomCode, (state, { roomCode }) => ({ ...state, roomCode })),
  on(getPlayers, (state, { players }) => ({ ...state, players })),
  on(setPlayerReadyStatus, (state, { playerId, isReady }) => {
    const idx = state.players.findIndex(
      (player: Player) => player.id === playerId
    );

    return {
      ...state,
      players: state.players.map((player) =>
        player.id === state.players[idx].id ? { ...player, isReady } : player
      ),
    };
  }),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay })),
  on(askQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  }))
);