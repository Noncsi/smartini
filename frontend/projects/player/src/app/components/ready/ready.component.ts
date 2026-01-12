import { Component, computed, inject, Signal } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  imports: [FormsModule, ToggleSwitchModule, Button],
})
export class ReadyComponent {
  lobbyService = inject(LobbyService);
  isReady = this.lobbyService.isReady;
  self = this.lobbyService.self;
  hostPlayerId = this.lobbyService.hostPlayerId;
  isHost: Signal<boolean> = computed(
    () => this.self().id === this.hostPlayerId()
  );
  isEveryPlayerReady = this.lobbyService.isEveryPlayerReady;

  setReady(event: any) {
    this.lobbyService.setReady(event.checked);
  }

  startGame() {
    this.lobbyService.startGame();
  }
}
