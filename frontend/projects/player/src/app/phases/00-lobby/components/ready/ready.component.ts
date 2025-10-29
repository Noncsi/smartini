import { Component, inject } from '@angular/core';
import { LobbyService } from '../../service/lobby.service';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
})
export class ReadyComponent {
  lobbyService = inject(LobbyService);

  ready() {
    this.lobbyService.setReady();
  }
}
