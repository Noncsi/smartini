import { correctAnswer } from "../app";
import { GameBoardSocket } from "../types";

export const checkAnswer = (
  socket: GameBoardSocket,
  playerId: string,
  text: string
) => {
  const isCorrect = text === correctAnswer;
  socket.emit("answerResult", isCorrect);
};