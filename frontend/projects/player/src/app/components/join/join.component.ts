import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [],
})
export class JoinComponent {
  gameService = inject(GameService);

  join(roomCode: string, playerName: string) {
    this.gameService.join(roomCode, playerName);
  }
}
