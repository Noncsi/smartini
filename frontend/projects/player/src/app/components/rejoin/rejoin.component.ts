import { Component } from '@angular/core';

@Component({
  selector: 'app-rejoin',
  standalone: true,
  imports: [],
  templateUrl: './rejoin.component.html',
  styleUrl: './rejoin.component.scss',
})
export class RejoinComponent {
  rejoin() {
    const roomCode = localStorage.getItem('roomCode');
    const playerId = localStorage.getItem('playerId');
    // roomCode && playerId
    //   ? this.socketService.reJoinRoom(roomCode, playerId)
    //   : console.log('Reconnection was unsuccessful: Necessary info missing.');
  }
}
