import { Component } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
})
export class ReadyComponent {
  constructor(private gameService: GameService) {}
  ready() {
    this.gameService.setReady();
  }
}
