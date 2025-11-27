import SocketEvent from "../../../shared/socket-event";
import { correctAnswer } from "../create-server";
import { PlayerSocket } from "../store/types/game.types";

export const checkAnswer = (socket: PlayerSocket, answerId: string) => {
  const isCorrect = answerId === correctAnswer.id;
  socket.emit(SocketEvent.AnswerResult, isCorrect);
};
