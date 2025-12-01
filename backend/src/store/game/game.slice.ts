import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPlayerObject, createRoomObject } from "../../utils/factories";
import {
  GameBoardSocket,
  RoomCode,
  PlayerSocket,
  GameStage,
  Question,
  Room,
  Player,
} from "../types/game.types";
import {
  selectIsRoomExist,
  selectPlayerInRoomById,
  selectRoomByCode,
} from "./game.selectors";

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

    emitCountdown: (
      state,
      action: PayloadAction<{ socket: GameBoardSocket; number: number }>
    ) => {},
    fetchQuestion: (state, action: PayloadAction<{ roomCode: string }>) => {},
    fetchQuestionWithCountdown: (
      state,
      action: PayloadAction<{ roomCode: string }>
    ) => {},
    fetchQuestionSuccess: (
      state,
      action: PayloadAction<{ roomCode: string; question: Question }>
    ) => {
      const { roomCode, question } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.currentQuestion = question;
      room.players.every((player: Player) => (player.hasAnswered = false));
    },

    sendQuestion: (
      state,
      action: PayloadAction<{ roomCode: string; question: Question }>
    ) => {},

    evaluateAnswer: (
      state,
      action: PayloadAction<{
        roomCode: string;
        playerId: string;
        answerId: number;
      }>
    ) => {
      const { roomCode, playerId } = action.payload;
      const player = selectPlayerInRoomById(state, roomCode, playerId);
      if (!player) return;
      player.hasAnswered = true;
    },

    answeredCorrectly: (
      state,
      action: PayloadAction<{
        roomCode: RoomCode;
        playerId: string;
      }>
    ) => {
      // const { player } = action.payload;
      // player.hasAnswered = true;
    },

    answeredIncorrectly: (
      state,
      action: PayloadAction<{
        player: Player;
      }>
    ) => {
      // const { player } = action.payload;
      // player.hasAnswered = true;
    },

    addToScore: (
      state,
      action: PayloadAction<{
        roomCode: RoomCode;
        playerId: string;
      }>
    ) => {
      const { roomCode, playerId } = action.payload;
      const player = selectPlayerInRoomById(state, roomCode, playerId);
      player!.score += 10;
    },

    emitAnswerResults: (
      state,
      action: PayloadAction<{ roomCode: string }>
    ) => {},

    // add: (
    //   state,
    //   action: PayloadAction<{
    //     roomCode: string;
    //     playerId: string;
    //     answerId: number;
    //   }>
    // ) => {
    //   const { roomCode, playerId, answerId } = action.payload;
    //   const room = selectRoomByCode(state, roomCode);
    //   if (!room) return;
    //   const player = selectPlayerInRoomById(state, roomCode, playerId);
    //   if (!player) return;
    //   if (room.currentQuestion?.correctAnswerId === answerId) {
    //     player.score += 10;
    //   }
    // },
  },
});

export const {
  disconnectGameBoard,
  disconnectPlayer,
  createRoom,
  playerJoins,
  setReady,
  startGame,
  emitCountdown,
  fetchQuestion,
  fetchQuestionWithCountdown,
  fetchQuestionSuccess,
  evaluateAnswer,
  answeredCorrectly,
  answeredIncorrectly,
  addToScore,
  emitAnswerResults,
} = gameSlice.actions;

export default gameSlice.reducer;
