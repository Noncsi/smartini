import { Component, computed, inject, Signal } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  imports: [MatSlideToggleModule, MatButtonModule],
})
export class ReadyComponent {
  lobbyService = inject(LobbyService);
  isReady = this.lobbyService.isReady;
  self = this.lobbyService.self;
  hostPlayerId = this.lobbyService.hostPlayerId;
  isHost: Signal<boolean> = computed(
    () => this.self().id === this.hostPlayerId()
  );

  setReady(event: MatSlideToggleChange) {
    this.lobbyService.setReady(event.checked);
  }
}
