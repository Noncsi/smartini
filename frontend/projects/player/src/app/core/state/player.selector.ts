import { Game } from '@models/game';
import { Player } from '@models/player';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGame = createFeatureSelector<Game>('game');
export const selectPlayer = createFeatureSelector<Player>('game');

export const selectIsPaused = createSelector(
  selectGame,
  (game: Game) => game.isPaused
);

export const selectRoomCode = createSelector(
  selectGame,
  (game: Game) => game.roomCode
);

export const selectIsJoined = createSelector(
  selectPlayer,
  (player: Player) => !!player.id
);

export const selectPlayerId = createSelector(
  selectPlayer,
  (player: Player) => player.id
);

export const selectGamePhase = createSelector(
  selectGame,
  (game: Game) => game.phase
);

export const selectQuestion = createSelector(
  selectGame,
  (game: Game) => game.currentQuestion
);
