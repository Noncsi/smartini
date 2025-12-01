import { Socket } from "socket.io";

export type RoomCode = string;
export enum SocketType {
  GameboardSocket,
  PlayerSocket,
}

export enum GameStage {
  lobby,
  game,
}

export interface Room {
  stage: GameStage;
  roomCode: RoomCode;
  players: Player[];
  currentQuestion?: Question;
}

export type GameBoardSocket = Socket;
export type PlayerSocket = Socket;

export interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
  hasAnswered: boolean;
}

export interface IQuestionApiResponse {
  response_code: string;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export interface Answer {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answerOptions: Answer[];
  correctAnswerId: number;
}
