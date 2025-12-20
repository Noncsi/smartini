import { Player } from '@models/player';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPlayer = createFeatureSelector<Player>('player');

export const selectPlayerObject = createSelector(
  selectPlayer,
  (player: Player) => player
);

export const selectIsJoined = createSelector(
  selectPlayer,
  (player: Player) => !!player.id
);

export const selectPlayerId = createSelector(
  selectPlayer,
  (player: Player) => player.id
);

export const selectIsPlayerReady = createSelector(
  selectPlayer,
  (player: Player) => player.isReady
);

export const selectDidAnswerCurrentQuestion = createSelector(
  selectPlayer,
  (player: Player) => player.didAnswerCurrentQuestion
);

export const selectChosenAnswerId = createSelector(
  selectPlayer,
  (player: Player) => player.chosenAnswerId
);
