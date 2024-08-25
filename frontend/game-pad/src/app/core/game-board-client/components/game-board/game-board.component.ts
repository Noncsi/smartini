import { Component, OnInit } from '@angular/core';
import { IoService } from '../../../../io.service';
import { Socket } from 'socket.io-client';
import { Player } from '../../../game-pad-client/model/player';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  socket: Socket | undefined;
  roomCode: string | null = null;
  players: Player[] | undefined;
  constructor(private ioService: IoService) {}

  ngOnInit(): void {
    this.socket = this.ioService.createRoom();
    this.socket.on('players', (players: Player[]) => {
      console.log('1', players);
      this.players = players;
    });
    this.socket.on('roomCreated', (roomCode) => {
      this.roomCode = roomCode;
    });
    this.socket.on('ready', (playerId: string, isReady: boolean) => {
      const player = this.players?.find(
        (player: Player) => player.id === playerId
      );
      if (player) {
        player.isReady = isReady;
      }
    });
  }
}
