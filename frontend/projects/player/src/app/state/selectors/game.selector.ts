import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerGameState } from '../reducers/game.reducer';

export const selectGame = createFeatureSelector<PlayerGameState>('game');

export const selectIsPaused = createSelector(
  selectGame,
  (game: PlayerGameState) => game.isPaused
);

export const selectRoomCode = createSelector(
  selectGame,
  (game: PlayerGameState) => game.roomCode
);

export const selectGamePhase = createSelector(
  selectGame,
  (game: PlayerGameState) => game.phase
);

export const selectHostPlayerId = createSelector(
  selectGame,
  (game: PlayerGameState) => game.hostPlayerId
);

export const selectArePlayersReady = createSelector(
  selectGame,
  (game: PlayerGameState) => game.arePlayersReady
);

export const selectQuestion = createSelector(
  selectGame,
  (game: PlayerGameState) => game.currentQuestion
);

export const selectCountdown = createSelector(
  selectGame,
  (game: PlayerGameState) => game.countdown
);
