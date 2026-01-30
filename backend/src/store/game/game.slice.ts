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
      action: PayloadAction<{ socket: GameBoardSocket }>,
    ) => {
      const { socket } = action.payload;
      state.rooms.splice(
        state.rooms.findIndex((room) => room.roomCode === socket.data.roomCode),
      );
    },
    disconnectPlayer: (
      state,
      action: PayloadAction<{ socket: PlayerSocket }>,
    ) => {
      const { socket } = action.payload;
      const room = selectRoomByCode(state, socket.data.roomCode);
      if (!room) return;

      const idx = room.players.findIndex(
        (player) => player.id === socket.data.playerId,
      );
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
      const { roomCode, newPlayerId, newPlayerName, newPlayerIconId } =
        action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      if (room.players.some((player) => player.name === newPlayerName)) return;

      if (!room.players.length) room.hostPlayerId = newPlayerId;
      room.players.push(
        createPlayerObject(newPlayerId, newPlayerName, newPlayerIconId),
      );
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
    },

    startCountdown: (
      state,
      action: PayloadAction<{ roomCode: string; countFrom: number }>,
    ) => {},

    fetchQuestion: (state, action: PayloadAction<{ roomCode: string }>) => {},

    fetchQuestionSuccess: (
      state,
      action: PayloadAction<{ roomCode: string; question: Question }>,
    ) => {
      const { roomCode, question } = action.payload;
      const room = selectRoomByCode(state, roomCode);
      if (!room) return;
      room.currentQuestion = question;
      room.players.map((player: Player) => (player.hasAnswered = false));
    },

    sendQuestion: (
      state,
      action: PayloadAction<{ roomCode: string; question: Question }>,
    ) => {},

    evaluateAnswer: (
      state,
      action: PayloadAction<{
        roomCode: string;
        playerId: string;
        answerId: number;
      }>,
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
      }>,
    ) => {},

    answeredIncorrectly: (
      state,
      action: PayloadAction<{
        player: Player;
      }>,
    ) => {},

    addToScore: (
      state,
      action: PayloadAction<{
        roomCode: RoomCode;
        playerId: string;
      }>,
    ) => {
      const { roomCode, playerId } = action.payload;
      const player = selectPlayerInRoomById(state, roomCode, playerId);
      player!.score += 10;
    },

    emitAnswerResults: (
      state,
      action: PayloadAction<{ roomCode: string }>,
    ) => {},

    emitScores: (state, action: PayloadAction<{ roomCode: string }>) => {},
    nextQuestion: (state, action: PayloadAction<{ roomCode: string }>) => {},
  },
});

export const {
  disconnectGameBoard,
  disconnectPlayer,
  createRoom,
  playerJoins,
  setReady,
  startGame,
  startCountdown,
  fetchQuestion,
  fetchQuestionSuccess,
  evaluateAnswer,
  answeredCorrectly,
  answeredIncorrectly,
  addToScore,
  emitAnswerResults,
  emitScores,
  nextQuestion,
} = gameSlice.actions;

export default gameSlice.reducer;
