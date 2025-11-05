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
  currentQuestion = this.gameService.currentQuestion

  getQuestion() {
    this.gameService.getQuestion()
  }
}
