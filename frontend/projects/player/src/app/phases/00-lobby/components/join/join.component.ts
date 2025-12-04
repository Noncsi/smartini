import { Component, inject } from '@angular/core';
import { LobbyService } from '../../lobby.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class JoinComponent {
  lobbyService = inject(LobbyService);

  join(roomCode: string, playerName: string) {
    this.lobbyService.join(roomCode.toUpperCase(), playerName);
  }
}
