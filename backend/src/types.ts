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

export interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export function mapQuestionApiResponseToQuestion(
  response: IQuestionApiResponse
): Question {
  return {
    question: response.results[0].question,
    correctAnswer: response.results[0].correct_answer,
    wrongAnswers: response.results[0].incorrect_answers,
  };
}
