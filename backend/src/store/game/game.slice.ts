import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPlayerObject, createRoomObject } from '../../utils/factories';
import {
  GameBoardSocket,
  RoomCode,
  PlayerSocket,
  Question,
  Room,
  Player,
} from '../types/game.types';
import { selectIsRoomExist, selectPlayerInRoomById, selectRoomByCode } from './game.selectors';
import { GameStage } from '../../../../shared/types';

export interface GameState {
  rooms: Room[];
}

const initialState: GameState = {
  rooms: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    disconnectGameBoard: (state, action: PayloadAction<{ socket: GameBoardSocket }>) => {
      const { socket } = action.payload;
      state.rooms.splice(state.rooms.findIndex(room => room.roomCode === socket.data.roomCode));
    },
    disconnectPlayer: (state, action: PayloadAction<{ socket: PlayerSocket }>) => {
      const { socket } = action.payload;
      const room = selectRoomByCode(state, socket.data.roomCode);
      if (!room) return;

      const idx = room.players.findIndex(player => player.id === socket.data.playerId);
      room.players.splice(idx, 1);
    },
    createRoom: (
      state,
      action: PayloadAction<{ socket: GameBoardSocket; newRoomCode: RoomCode }>,
    ) => {
      const { newRoomCode } = action.payload;
      if (selectIsRoomExist(state, newRoomCode)) return;
      state.rooms.push(createRoomObject(newRoomCode));
    },

    playerJoins: (
      state,
      action: PayloadAction<{
        socket: PlayerSocket;
        roomCode: RoomCode;
        newPlayerId: string;
        newPlayerName: string;
        newPlayerIconId: number;
      }>,
    ) => {
      const { roomCode, newPlayerId, newPlayerName, newPlayerIconId } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      if (room.players.some(player => player.name === newPlayerName)) return;

      if (!room.players.length) room.hostPlayerId = newPlayerId;
      room.players.push(createPlayerObject(newPlayerId, newPlayerName, newPlayerIconId));
    },

    setReady: (
      state,
      action: PayloadAction<{
        roomCode: RoomCode;
        playerId: string;
        isReady: boolean;
      }>,
    ) => {
      const { roomCode, playerId, isReady } = action.payload;
      const player = selectPlayerInRoomById(state, roomCode, playerId);
      if (!player) return;
      player.isReady = isReady;
    },

    startGame: (state, action: PayloadAction<{ roomCode: string }>) => {
      const room = selectRoomByCode(state, action.payload.roomCode);
      if (!room) return;
      room.stage = GameStage.game;
      room.currentRound = 1;
    },

    countdownBeforeQuestion: (state, action: PayloadAction<{ roomCode: string }>) => {},

    fetchQuestions: (state, action: PayloadAction<{ roomCode: string }>) => {},
    fetchQuestionsSuccess: (
      state,
      action: PayloadAction<{ roomCode: string; questions: Question[] }>,
    ) => {
      const { roomCode, questions } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.allQuestions = questions;
      room.currentQuestion = questions[0];
    },

    emitCurrentQuestion: (state, action: PayloadAction<{ roomCode: string }>) => {
      const { roomCode } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.players.map((player: Player) => (player.hasAnswered = false));
    },
    emitCurrentQuestionSuccess: (state, action: PayloadAction<{ roomCode: string }>) => {},

    evaluateAnswer: (
      state,
      action: PayloadAction<{
        roomCode: string;
        playerId: string;
        answerId: number;
      }>,
    ) => {
      const { roomCode, playerId, answerId } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      const player = selectPlayerInRoomById(state, roomCode, playerId);
      if (!room || !player) return;
      if (room.currentQuestion?.correctAnswerId === answerId) {
        player.score += 10;
      }
      player.hasAnswered = true;
    },

    emitAnswerResults: (state, action: PayloadAction<{ roomCode: string }>) => {},

    emitScores: (state, action: PayloadAction<{ roomCode: string }>) => {
      const { roomCode } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.currentRound++;
      if (room.currentRound <= room.allQuestions.length) {
        room.currentQuestion = room.allQuestions[room.currentRound-1];
      }
    },

    endGame: (state, action: PayloadAction<{ roomCode: string }>) => {
      const { roomCode } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.stage = GameStage.end;
  },
}});

export const {
  disconnectGameBoard,
  disconnectPlayer,
  createRoom,
  playerJoins,
  setReady,
  startGame,
  countdownBeforeQuestion,
  fetchQuestions,
  fetchQuestionsSuccess,
  emitCurrentQuestion,
  emitCurrentQuestionSuccess,
  evaluateAnswer,
  emitAnswerResults,
  emitScores,
  endGame
} = gameSlice.actions;

export default gameSlice.reducer;
