import { Game } from '@models/game';
import { Player } from '@models/player';
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

export const selectHostPlayerId = createSelector(
  selectGame,
  (game: Game) => game.hostPlayerId
);

export const selectIsEveryPlayerReady = createSelector(
  selectGame,
  (game: Game) => game.players.length && game.players.every((player: Player) => player.isReady)
);

export const selectQuestion = createSelector(
  selectGame,
  (game: Game) => game.currentQuestion
);

export const selectCountdown = createSelector(
  selectGame,
  (game: Game) => game.countdown
);
