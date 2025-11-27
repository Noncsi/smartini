import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPlayerObject, createRoomObject } from "../../utils/factories";
import {
  GameBoardSocket,
  RoomCode,
  PlayerSocket,
  GameStage,
  Question,
  Room,
  SocketType,
} from "../types/game.types";
import {
  selectIsRoomExist,
  selectPlayerInRoomById,
  selectRoomByCode,
} from "./game.selectors";
import { gameBoardSocketMap } from "../../services/socket-registry";

export interface GameState {
  rooms: Room[];
}

const initialState: GameState = {
  rooms: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    disconnectGameBoard: (
      state,
      action: PayloadAction<{ socket: GameBoardSocket }>
    ) => {
      const { socket } = action.payload;
      state.rooms.splice(
        state.rooms.findIndex((room) => room.roomCode === socket.data.roomCode)
      );
    },
    disconnectPlayer: (
      state,
      action: PayloadAction<{ socket: PlayerSocket }>
    ) => {
      const { socket } = action.payload;
      const room = selectRoomByCode(state, socket.data.roomCode);
      if (!room) return;

      const idx = room.players.findIndex(
        (player) => player.id === socket.data.playerId
      );
      room.players.splice(idx, 1);
    },
    createRoom: (
      state,
      action: PayloadAction<{ socket: GameBoardSocket; newRoomCode: RoomCode }>
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
      }>
    ) => {
      const { roomCode, newPlayerId, newPlayerName } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      if (room.players.some((player) => player.name === newPlayerName)) return;

      room.players.push(createPlayerObject(newPlayerId, newPlayerName));
    },

    setReady: (
      state,
      action: PayloadAction<{
        roomCode: RoomCode;
        playerId: string;
        isReady: boolean;
      }>
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
    },

    sendQuestion: (
      state,
      action: PayloadAction<{ roomCode: string; question: Question }>
    ) => {
      const room = state.rooms.find(
        (r) => r.roomCode === action.payload.roomCode
      );
      if (room) {
        // room.currentQuestion = action.payload.question;
      }
    },

    submitAnswer: (
      state,
      action: PayloadAction<{
        roomCode: string;
        playerId: string;
        answer: string;
      }>
    ) => {
      const room = state.rooms.find(
        (r) => r.roomCode === action.payload.roomCode
      );
      const player = room?.players.find(
        (p) => p.id === action.payload.playerId
      );
      // if (player) player.answer = action.payload.answer;
    },

    checkAnswers: (state, action: PayloadAction<{ roomCode: string }>) => {
      const room = state.rooms.find(
        (r) => r.roomCode === action.payload.roomCode
      );
      if (room?.currentQuestion) {
        const correct = room.currentQuestion.correctAnswer;
        room.players.forEach((p) => {
          // if (p.answer === correct) p.score += 100;
        });
      }
    },
  },
});

export const {
  disconnectGameBoard,
  disconnectPlayer,
  createRoom,
  playerJoins,
  setReady,
  // getQuestion,
  submitAnswer,
} = gameSlice.actions;

export default gameSlice.reducer;
