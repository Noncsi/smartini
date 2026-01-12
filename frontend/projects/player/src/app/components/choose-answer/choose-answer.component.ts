import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { selectPlayer } from '../../state/selectors/player.selector';
import { ButtonModule } from 'primeng/button';
import { QuestionComponent } from "../question/question.component";

@Component({
  selector: 'app-choose-answer',
  standalone: true,
  imports: [CommonModule, ButtonModule, QuestionComponent],
  templateUrl: './choose-answer.component.html',
})
export class ChooseAnswerComponent {
  gameService = inject(GameService);
  question = this.gameService.questionPrompt;
  secondsRemaining = this.gameService.countdown;

  me = this.gameService.store.selectSignal(selectPlayer);
}
