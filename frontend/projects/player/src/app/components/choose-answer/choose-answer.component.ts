import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { MatButtonModule } from '@angular/material/button';
import { selectPlayer } from '../../state/selectors/player.selector';

@Component({
  selector: 'app-choose-answer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './choose-answer.component.html',
  styleUrl: './choose-answer.component.scss',
})
export class ChooseAnswerComponent {
  gameService = inject(GameService);
  question = this.gameService.questionPrompt;
  secondsRemaining = this.gameService.countdown;
  alreadyAnswered = this.gameService.didAnswer;
  chosenAnswerId = this.gameService.chosenAnswerId;

  me = this.gameService.store.selectSignal(selectPlayer)

  sendAnswer(answerId: number) {
    if (this.alreadyAnswered()) return;
    this.gameService.sendAnswer(answerId);
  }
}
