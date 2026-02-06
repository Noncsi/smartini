import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent as BaseQuestionComponent } from '@libs/components/question/question.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, BaseQuestionComponent],
  templateUrl: '../../../../../../libs/components/question/question.component.html',
})
export class QuestionComponent extends BaseQuestionComponent {
}
