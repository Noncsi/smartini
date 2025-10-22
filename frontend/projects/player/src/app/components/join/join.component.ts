import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [],
})
export class JoinComponent {
  constructor(private gameService: GameService) {}

  joinToRoom(roomCode: string, playerName: string) {
    this.gameService.joinToRoom(roomCode, playerName);
  }
}
