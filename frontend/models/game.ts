import { Player } from './player';
import { QuestionPrompt } from './question';

export enum GamePhase {
  lobby,
  gamePlay,
  result,
}

export interface GameState {
  phase: GamePhase;
  roomCode: string;
  isPaused: boolean;
  hostPlayerId: string;
  countdown: number;
  currentQuestion: QuestionPrompt;
  currentCorrectAnswerId: number;
}
