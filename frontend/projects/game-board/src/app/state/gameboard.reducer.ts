import { createReducer, on } from '@ngrx/store';
import {
  receivePlayers,
  createRoomSuccess,
  pause,
  resume,
  setPlayerReadyStatus,
  startGame,
  askQuestion,
  countdown,
  showCorrectAnswer,
  receiveHostPlayerId,
} from './gameboard.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';

const initialState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [
    {
      id: 'a',
      name: 'Jordan',
      iconId: 4,
      score: 0,
      isReady: false,
      didAnswerCurrentQuestion: false,
    },
    {
      id: 'b',
      name: 'Alex',
      iconId: 6,
      score: 0,
      isReady: true,
      didAnswerCurrentQuestion: false,
    },
    {
      id: 'c',
      name: 'Stuart',
      iconId: 8,
      score: 0,
      isReady: true,
      didAnswerCurrentQuestion: false,
    },
  ],
  hostPlayerId: '',
  countdown: 0,
  currentQuestion: { question: '', answerOptions: [] },
  currentCorrectAnswerId: 0,
};

export const gameReducer = createReducer(
  initialState,
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(createRoomSuccess, (state, { roomCode }) => ({ ...state, roomCode })),
  on(receivePlayers, (state, { players }) => ({ ...state, players })),
  on(receiveHostPlayerId, (state, { hostPlayerId }) => ({
    ...state,
    hostPlayerId,
  })),
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
  on(countdown, (state, { number }) => ({ ...state, countdown: number })),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay })),
  on(askQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  })),
  on(showCorrectAnswer, (state, { id }) => ({
    ...state,
    currentCorrectAnswerId: id,
  }))
);
