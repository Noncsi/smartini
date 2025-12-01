import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  gameService = inject(GameService);
  players = this.gameService.players;
  currentQuestion = this.gameService.currentQuestion;
  secondsRemaining = this.gameService.countdown;
  currentCorrectAnswerId = this.gameService.currentCorrectAnswerId;
}
