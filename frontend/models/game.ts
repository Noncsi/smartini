import { Player } from './player';
import { QuestionPrompt } from './question';

export enum GamePhase {
  lobby,
  gamePlay,
  result,
}

export interface Game {
  phase: GamePhase;
  roomCode: string;
  isPaused: boolean;
  players: Player[];
  hostPlayerId: string;
  countdown: number;
  currentQuestion: QuestionPrompt;
  currentCorrectAnswerId: number;
}
