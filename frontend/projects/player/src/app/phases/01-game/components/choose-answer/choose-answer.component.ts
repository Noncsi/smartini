import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPrompt } from '@models/question';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-choose-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-answer.component.html',
  styleUrl: './choose-answer.component.scss',
})
export class ChooseAnswerComponent {
  gameService = inject(GameService)
  question = this.gameService.questionPrompt;

  sendAnswer(text: string) {
    // this.socketService.sendAnswer(text);

    const set = new Map(
      'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .map((letter, index) => [letter, index + 1])
    );
    const asd = text
      .replace(' ', '')
      .split('')
      .filter((letter) => set.has(letter))
      .map((letter) => set.get(letter) as number)
      .join(' ');
    return asd;
  }
}
