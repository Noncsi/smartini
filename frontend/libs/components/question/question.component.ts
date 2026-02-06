import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPrompt } from '@models/question';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
})
export class QuestionComponent {
  question = input.required<QuestionPrompt>();
  correctAnswerId = input<number>(0);
  lockedAnswerId = input<number>(0);

  lock(answerId: number): void {}
}
