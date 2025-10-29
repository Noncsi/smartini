import { Socket } from "socket.io";

export type RoomCode = string;

export enum GameStage {
  lobby,
  game,
}

export type GameBoardSocket = Socket;
export type PlayerSocket = Socket;

export type QuestionResponse = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};
