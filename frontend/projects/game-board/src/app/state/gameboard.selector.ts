import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameBoardGameState } from './gameboard.reducer';

export const selectGame = createFeatureSelector<GameBoardGameState>('game');

export const selectIsPaused = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.isPaused
);

export const selectRoomCode = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.roomCode
);

export const selectPlayers = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.players
);

export const selectHostPlayerId = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.hostPlayerId
);

export const selectGamePhase = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.phase
);

export const selectCountdown = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.countdown
);

export const selectAnswerRevealCountdown = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.answerRevealCountdown
);

export const selectQuestion = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.currentQuestion
);

export const selectCurrentCorrectAnswerId = createSelector(
  selectGame,
  (game: GameBoardGameState) => game.currentCorrectAnswerId
);
