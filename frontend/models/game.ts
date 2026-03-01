import { GameStage } from '../../shared/types';
import { QuestionPrompt } from './question';

export interface GameState {
  stage: GameStage;
  roomCode: string;
  isPaused: boolean;
  hostPlayerId: string;
  countdown: number;
  currentQuestion: QuestionPrompt;
  currentCorrectAnswerId: number;
}
