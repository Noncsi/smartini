import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, toggleReadyStatusAttempt } from '../state/player.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);

  join(roomCode: string, playerName: string) {
    this.store.dispatch(joinAttempt({ roomCode, playerName }));
  }

  setReady() {
    this.store.dispatch(toggleReadyStatusAttempt());
  }
}
