import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, setReadyStatusAttempt } from '../state/lobby.actions';
import { selectIsPlayerReady } from '../../../core/state/player.selector';

@Injectable({ providedIn: 'root' })
export class LobbyService {
  store = inject(Store);
  isReady = this.store.selectSignal(selectIsPlayerReady);

  join(roomCode: string, playerName: string) {
    this.store.dispatch(joinAttempt({ roomCode, playerName }));
  }

  setReady(isReady: boolean) {
    this.store.dispatch(setReadyStatusAttempt({ isReady }));
  }
}
