import { IoService } from './services/io.service';
import { GameComponent } from './components/game/game.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectGamePhase,
  selectPlayers,
  selectRoomCode,
} from './state/gameboard.selector';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-board';
  gamePhase = GamePhase;
  phase$: Observable<GamePhase>;
  players$: Observable<Player[]>;
  roomCode$: Observable<string>;

  constructor(
    private service: IoService,
    private store: Store<{ game: Game }> // private clipBoard: Clipboard
  ) {
    this.phase$ = this.store.select(selectGamePhase);
    this.roomCode$ = this.store.select(selectRoomCode);
    this.players$ = this.store.select(selectPlayers);
  }
}
