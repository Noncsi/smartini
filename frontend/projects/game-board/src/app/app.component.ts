import { GameComponent } from './components/game/game.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from '../../../player';
import { IoService } from './services/io.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-board';
  roomCode: string = '';
  players: Player[] = [];
  startGame = false;
  constructor(private ioService: IoService) {}

  ngOnInit(): void {
    this.ioService.createRoom();
    this.ioService.socket?.on('players', (players: Player[]) => {
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

    this.ioService.socket?.on('startGame', () => {
      console.log('Game has started');
      this.startGame = true;
    });
  }
}
