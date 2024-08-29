import { map, Observable } from 'rxjs';
import { QuestionService } from './../../services/question.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  question$: Observable<string>;

  constructor(private questionService: QuestionService) {
    this.question$ = this.questionService
      .getQuestion()
      .pipe(map((obj: any) => obj.results[0].question));
  }
}
