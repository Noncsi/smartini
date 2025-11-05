import { Component, inject } from '@angular/core';
import { LobbyService } from '../../lobby.service';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [],
})
export class JoinComponent {
  lobbyService = inject(LobbyService);

  join(roomCode: string, playerName: string) {
    this.lobbyService.join(roomCode, playerName);
  }
}
