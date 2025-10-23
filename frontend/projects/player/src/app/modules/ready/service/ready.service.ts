import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleReadyStatusAttempt } from '../state/ready.actions';

@Injectable({ providedIn: 'root' })
export class ReadyService {
  store = inject(Store);

  setReady() {
    this.store.dispatch(toggleReadyStatusAttempt());
  }
}
