import { Injectable } from '@angular/core';
import { GamePhase } from '@models/game';
import { Player } from '@models/player';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectGamePhase,
  selectRoomCode,
  selectPlayers,
} from '../state/gameboard.selector';

@Injectable({ providedIn: 'root' })
export class GameService {
  phase$: Observable<GamePhase>;
  players$: Observable<Player[]>;
  roomCode$: Observable<string>;

  constructor(private store: Store) {
    this.phase$ = this.store.select(selectGamePhase);
    this.roomCode$ = this.store.select(selectRoomCode);
    this.players$ = this.store.select(selectPlayers);
  }

  getQuestion() {
  }
}
