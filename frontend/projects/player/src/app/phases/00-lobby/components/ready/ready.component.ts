import { Component, inject } from '@angular/core';
import { LobbyService } from '../../service/lobby.service';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
  imports: [MatSlideToggleModule],
})
export class ReadyComponent {
  lobbyService = inject(LobbyService);
  isReady = this.lobbyService.isReady;
  me = this.lobbyService.me;

  setReady(event: MatSlideToggleChange) {
    this.lobbyService.setReady(event.checked);
  }
}
