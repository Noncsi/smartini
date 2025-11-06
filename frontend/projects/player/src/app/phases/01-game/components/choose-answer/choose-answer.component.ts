import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../game.service';
import { MatButtonModule } from '@angular/material/button';

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

  sendAnswer(text: string) {
    this.gameService.sendAnswer(text);
  }
}
