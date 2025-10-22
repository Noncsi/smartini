import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePhase } from '@models/game';
import { Store } from '@ngrx/store';
import { selectGamePhase } from './state/gameboard.selector';
import { LobbyComponent } from './components/lobby/lobby.component';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LobbyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  webSocketService = inject(WebSocketService)
  store = inject(Store);
  gamePhase = GamePhase;
  currentPhase: Signal<GamePhase> = this.store.selectSignal(selectGamePhase);
}
