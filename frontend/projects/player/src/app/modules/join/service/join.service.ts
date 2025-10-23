import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt } from '../state/join.actions';

@Injectable({ providedIn: 'root' })
export class JoinService {
  store = inject(Store);

  join(roomCode: string, playerName: string) {
    this.store.dispatch(joinAttempt({ roomCode, playerName }));
  }
}
