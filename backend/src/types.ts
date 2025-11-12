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

export type GameBoardSocket = Socket;
export type PlayerSocket = Socket;

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
  question: string;
  correctAnswer: Answer;
  incorrectAnswers: Answer[];
}

export interface QuestionToSend {
  question: string;
  options: Answer[];
}
