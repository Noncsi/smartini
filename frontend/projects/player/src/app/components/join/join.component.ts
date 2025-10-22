import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [CardModule, InputTextModule, ButtonModule],
})
export class JoinComponent {
  constructor(private gameService: GameService) {}

  joinToRoom(roomCode: string, playerName: string) {
    this.gameService.joinToRoom(roomCode, playerName);
  }
}
