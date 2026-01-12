import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPrompt } from '@models/question';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
})
export abstract class QuestionComponent {
  question = input.required<QuestionPrompt>();

  abstract lock(answerId: number): void;
}
