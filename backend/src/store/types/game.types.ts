import { Socket } from 'socket.io';
import { GameStage } from '../../../../shared/types';

export type RoomCode = string;
export enum SocketType {
  GameboardSocket,
  PlayerSocket,
}

export interface Room {
  stage: GameStage;
  roomCode: RoomCode;
  players: Player[];
  hostPlayerId: string;
  allQuestions: Question[];
  currentRound: number;
  currentQuestion?: Question;
}

export type GameBoardSocket = Socket;
export type PlayerSocket = Socket;

export interface Player {
  id: string;
  name: string;
  iconId: number;
  score: number;
  isReady: boolean;
  hasAnswered: boolean;
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
  id: number;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answerOptions: Answer[];
  correctAnswerId: number;
}

export interface QuestionToSend {
  question: string;
  answerOptions: Answer[];
}
