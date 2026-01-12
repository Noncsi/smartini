import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  joinAttempt,
  setReadyStatusAttempt,
  startGame,
} from '../state/actions/lobby.actions';
import {
  selectPlayerObject,
  selectIsPlayerReady,
} from '../state/selectors/player.selector';
import {
  selectArePlayersReady,
  selectHostPlayerId,
  selectRoomCode,
} from '../state/selectors/game.selector';

@Injectable({ providedIn: 'root' })
export class LobbyService {
  store = inject(Store);
  roomCode = this.store.selectSignal(selectRoomCode);
  self = this.store.selectSignal(selectPlayerObject);
  isReady = this.store.selectSignal(selectIsPlayerReady);
  hostPlayerId = this.store.selectSignal(selectHostPlayerId);
  arePlayersReady = this.store.selectSignal(selectArePlayersReady);
  
  join(joinForm: Partial<JoinForm>) {
    this.store.dispatch(joinAttempt({ joinForm }));
  }

  setReady(isReady: boolean) {
    this.store.dispatch(setReadyStatusAttempt({ isReady }));
  }

  startGame() {
    this.store.dispatch(startGame());
  }
}

export interface JoinForm {
  roomCode: string;
  name: string;
  iconId: number;
}
