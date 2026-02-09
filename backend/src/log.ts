import winston from "winston";
import { PORT } from "../../shared/constants";
import { RoomCode } from "./store/types/game.types";

const { combine, timestamp, printf, colorize } = winston.format;

export const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "HH:mm:ss" }),
    printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

export const message = {
  info: {
    newSocketConnected: (socketId: string) =>
      `New socket is connected to server. Socket id: ${socketId}.`,
    gameBoardDisconnected: (socketId: string) =>
      `Game board has disconnected. Socket id: ${socketId}`,
    playerDisconnected: (id: string, roomCode: string, socketId: string) =>
      `Player with id: ${id} has disconnected from room '${roomCode}'. Socket id: ${socketId}`,
    serverIsRunning: () => `Server is running on port ${PORT}.`,
    roomCreated: (roomCode: RoomCode) => `Room '${roomCode}' has been opened.`,
    playerJoined: (name: string, roomCode: RoomCode, isHost: boolean) =>
      `Player '${name}' has joined room '${roomCode}'. Is host: ${isHost}`,
    playerStatusSet: (id: string, roomCode: RoomCode, isReady: boolean) =>
      `Player with id: ${id} in room '${roomCode}' has set its status to '${
        isReady ? "ready" : "not ready"
      }'.`,
    gameStarted: (roomCode: RoomCode) =>
      `Game in room '${roomCode}' has started.`,
    allPlayersAnswered: (roomCode: RoomCode) =>
      `All players in room '${roomCode}' have answered.`,
    answerTimedOut: (roomCode: RoomCode) =>
      `Answer timeout reached for room '${roomCode}' (10 seconds).`,
  },
  error: {
    unspecifiedSocketDisconnected: (socketId: string) =>
      `Unspecified socket disconnected. (Should be specified at connection) Socket id: ${socketId}.`,

    roomNotFound: (roomCode: RoomCode) => `Room '${roomCode}' was not found.`,
    nameAlreadyTaken: (name: string) => `Name '${name}' is already taken.`,
    playerNotFound: (id: string) => `Player with id: ${id} was not found.`,
  },
};
