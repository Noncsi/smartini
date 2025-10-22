import { Injectable } from '@angular/core';
import { GamePhase } from '@models/game';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGamePhase, selectRoomCode } from '../state/player.selector';
import { joinToRoom, toggleReadyStatus } from '../state/player.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  phase$: Observable<GamePhase>;
  roomCode$: Observable<string>;

  constructor(private store: Store) {
    this.phase$ = this.store.select(selectGamePhase);
    this.roomCode$ = this.store.select(selectRoomCode);
  }

  joinToRoom(roomCode: string, playerName: string) {
    this.store.dispatch(joinToRoom({ roomCode, playerName }));
  }

  setReady() {
    this.store.dispatch(toggleReadyStatus());
  }
}
