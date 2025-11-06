import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { finalize, map, Observable, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  gameService = inject(GameService);
  currentQuestion = this.gameService.currentQuestion;
  showQuestion = false;
  secondsRemaining$: Observable<number>;

  constructor() {
    this.gameService.getQuestion();
    this.secondsRemaining$ = timer(0, 1000).pipe(
      map((n) => 5 - n),
      takeWhile((n) => n > 0),
      finalize(() => (this.showQuestion = true))
    );
  }
}
