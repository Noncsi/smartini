import winston from "winston";
import { PORT } from "../../shared/constants";
import { RoomCode } from "./types";

const { combine, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "HH:mm:ss" }),
    printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export const log = {
  info: {
    newSocketConnected: (socketId: string) =>
      logger.info(`New socket is connected to server. Socket id: ${socketId}.`),
    gameBoardDisconnected: (socketId: string) =>
      logger.info(`Game board has disconnected. Socket id: ${socketId}`),
    playerDisconnected: (socketId: string) =>
      logger.info(`Player has disconnected. Socket id: ${socketId}`),
    serverIsRunning: () => logger.info(`Server is running on port ${PORT}.`),
  },
  success: {
    gameBoardCreated: (roomCode: RoomCode) =>
      logger.info(`Room '${roomCode}' has been opened.`),
    playerJoined: (name: string, roomCode: RoomCode) =>
      logger.info(`Player '${name}' has joined room '${roomCode}'.`),
  },
  error: {
    unspecifiedSocketDisconnected: (socketId: string) =>
      logger.error(
        `Unspecified socket disconnected. (Should be specified at connection) Socket id: ${socketId}.`
      ),
    roomNotFound: (roomCode: RoomCode) =>
      logger.error(`Room '${roomCode}' was not found.`),
    nameAlreadyTaken: (name: string) =>
      logger.error(`Name '${name}' is already taken.`),
    playerNotFound: (id: string) =>
      logger.error(`Player with id: ${id} was not found.`),
  },
};
