import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IoService, Question } from '../../services/io.service';

@Component({
  selector: 'app-choose-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-answer.component.html',
  styleUrl: './choose-answer.component.scss',
})
export class ChooseAnswerComponent {
  question$: Observable<Question>;

  constructor(private ioService: IoService) {
    this.question$ = this.ioService.question$;
  }

  sendAnswer(text: string) {
    this.ioService.sendAnswer(text);

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
