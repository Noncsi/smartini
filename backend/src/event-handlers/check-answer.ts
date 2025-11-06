import SocketEvent from "../../../shared/socket-event";
import { correctAnswer } from "../app";
import { PlayerSocket } from "../types";

export const checkAnswer = (
  socket: PlayerSocket,
  playerId: string,
  answer: string
) => {
  const isCorrect = answer == correctAnswer;
  socket.emit(SocketEvent.AnswerResult, isCorrect);
};