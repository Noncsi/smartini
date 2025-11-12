import SocketEvent from "../../../shared/socket-event";
import { correctAnswer } from "../app";
import { PlayerSocket } from "../types";

export const checkAnswer = (socket: PlayerSocket, answerId: string) => {
  const isCorrect = answerId === correctAnswer.id;
  socket.emit(SocketEvent.AnswerResult, isCorrect);
};
