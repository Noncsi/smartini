import { Player } from './player';
import { Question } from './question';

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
  currentQuestion: Question;
}
