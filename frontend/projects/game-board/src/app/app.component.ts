import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'socket.io-client';
import { Player } from '../../../player';
import { IoService } from '../../io.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-board';
  roomCode: string | null = null;
  players: Player[] | undefined;
  constructor(private ioService: IoService) {}

  ngOnInit(): void {
    this.ioService.createRoom();
    this.ioService.socket?.on('players', (players: Player[]) => {
      console.log('1', players);
      this.players = players;
    });
    this.ioService.socket?.on('roomCreated', (roomCode) => {
      this.roomCode = roomCode;
    });
    this.ioService.socket?.on('ready', (playerId: string, isReady: boolean) => {
      const player = this.players?.find(
        (player: Player) => player.id === playerId
      );
      if (player) {
        player.isReady = isReady;
      }
    });
  }
}
