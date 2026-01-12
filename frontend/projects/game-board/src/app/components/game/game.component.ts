import {
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { CardModule } from 'primeng/card';
import { QuestionComponent } from "../question/question.component";
import { ICON_MAP } from '../../../../../../libs/constants/icon-map';

@Component({
  selector: 'app-game', 
  standalone: true,
  imports: [CommonModule, CardModule, QuestionComponent],
  templateUrl: './game.component.html',
})
export class GameComponent {
  gameService = inject(GameService);
  iconMap = ICON_MAP;
  players = this.gameService.players;
  currentQuestion = this.gameService.currentQuestion;
  secondsRemaining = this.gameService.countdown;
  currentCorrectAnswerId = this.gameService.currentCorrectAnswerId;
}
