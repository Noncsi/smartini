import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, setReadyStatusAttempt } from './state/lobby.actions';
import { selectIsPlayerReady, selectPlayerObject } from '../../core/state/player/player.selector';

@Injectable({ providedIn: 'root' })
export class LobbyService {
  store = inject(Store);
  me = this.store.selectSignal(selectPlayerObject);
  isReady = this.store.selectSignal(selectIsPlayerReady);

  join(roomCode: string, name: string) {
    this.store.dispatch(joinAttempt({ roomCode, name }));
  }

  setReady(isReady: boolean) {
    this.store.dispatch(setReadyStatusAttempt({ isReady }));
  }
}
