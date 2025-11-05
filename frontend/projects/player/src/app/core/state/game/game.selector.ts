import { Game } from '@models/game';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGame = createFeatureSelector<Game>('game');

export const selectIsPaused = createSelector(
  selectGame,
  (game: Game) => game.isPaused
);

export const selectRoomCode = createSelector(
  selectGame,
  (game: Game) => game.roomCode
);

export const selectGamePhase = createSelector(
  selectGame,
  (game: Game) => game.phase
);

export const selectQuestion = createSelector(
  selectGame,
  (game: Game) => game.currentQuestion
);
