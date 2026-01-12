import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent as BaseQuestionComponent } from '@libs/components/question/question.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../../../../../libs/components/question/question.component.html'
})
export class QuestionComponent extends BaseQuestionComponent {
  gameService = inject(GameService);

  override lock(answerId: number) {
    if (this.gameService.didAnswer()) return;
    this.gameService.sendAnswer(answerId);
  }
}
