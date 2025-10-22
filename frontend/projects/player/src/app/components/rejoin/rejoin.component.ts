import { WebSocketService } from '../../services/websocket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rejoin',
  standalone: true,
  imports: [],
  templateUrl: './rejoin.component.html',
  styleUrl: './rejoin.component.scss',
})
export class RejoinComponent {
  constructor(private ioService: WebSocketService) {}
  rejoin() {
    const roomCode = localStorage.getItem('roomCode');
    const playerId = localStorage.getItem('playerId');
    roomCode && playerId
      ? this.ioService.reJoinRoom(roomCode, playerId)
      : console.log('Reconnection was unsuccessful: Necessary info missing.');
  }
}
