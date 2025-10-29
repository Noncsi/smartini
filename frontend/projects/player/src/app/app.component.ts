import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { GamePhase } from '@models/game';
import { selectGamePhase, selectIsJoined } from './core/state/player.selector';
import { SocketService } from './core/services/socket.service';
import { JoinComponent } from './phases/00-lobby/components/join/join.component';
import { ReadyComponent } from './phases/00-lobby/components/ready/ready.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JoinComponent, ReadyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  socketService = inject(SocketService);
  store = inject(Store);

  gamePhase = GamePhase;
  currentPhase: Signal<GamePhase> = this.store.selectSignal(selectGamePhase);
  isJoined: Signal<boolean> = this.store.selectSignal(selectIsJoined);
}
