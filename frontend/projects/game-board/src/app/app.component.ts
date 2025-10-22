import { WebSocketService } from './services/websocket.service';
import { GameComponent } from './components/game/game.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GamePhase } from '@models/game';
import { Player } from '@models/player';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameComponent],
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
    private webSocketService: WebSocketService,
    private gameService: GameService
  ) {
    this.phase$ = this.gameService.phase$;
    this.roomCode$ = this.gameService.roomCode$;
    this.players$ = this.gameService.players$;
  }
}
