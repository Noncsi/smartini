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
  isReady: boolean;
  score: number;
}

export interface IQuestionApiResponse {
  response_code: number;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface QuestionToSend {
  question: string;
  options: Answer[];
}
