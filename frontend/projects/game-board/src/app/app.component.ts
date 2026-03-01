import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectGamePhase } from './state/gameboard.selector';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SocketService } from './services/socket.service';
import { GameComponent } from "./components/game/game.component";
import { GameStage } from '../../../../../shared/types';
import { EndComponent } from "./components/end/end.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LobbyComponent, GameComponent, EndComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  webSocketService = inject(SocketService);
  store = inject(Store);
  gamePhase = GameStage;
  currentPhase: Signal<GameStage> = this.store.selectSignal(selectGamePhase);
}
