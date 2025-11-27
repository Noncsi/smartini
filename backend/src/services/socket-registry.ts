import { GameBoardSocket, PlayerSocket, RoomCode } from "../store/types/game.types";

export const gameBoardSocketMap = new Map<RoomCode, GameBoardSocket>();
export const playerSocketMap = new Map<string, PlayerSocket>();