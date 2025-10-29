import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../../core/services/socket.service';
import { Question } from '@models/question';

@Component({
  selector: 'app-choose-answer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-answer.component.html',
  styleUrl: './choose-answer.component.scss',
})
export class ChooseAnswerComponent {
  // question$: Observable<Question>;

  constructor(private socketService: SocketService) {
    // this.question$ = this.socketService.question$;
  }

  sendAnswer(text: string) {
    this.socketService.sendAnswer(text);

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
