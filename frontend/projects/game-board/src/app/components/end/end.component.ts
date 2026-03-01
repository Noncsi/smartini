import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ICON_MAP } from '../../../../../../libs/constants/icon-map';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end.component.html',
})
export class EndComponent {
  gameService = inject(GameService);
  iconMap = ICON_MAP;
  winnerPlayer = this.gameService.winnerPlayer;
}
