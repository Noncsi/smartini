import { Component, OnInit } from '@angular/core';
import { IoService } from '../../../../io.service';
import { Socket } from 'socket.io-client';
import { Player } from '../../../player-pad-client/model/player';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  socket: Socket | undefined;
  roomCode: string | null = null;
  joinedPlayers: Player[] = [];
  constructor(private ioService: IoService) {}

  ngOnInit(): void {
    this.socket = this.ioService.joinHost();
    this.socket.on('newPlayer', (name) => {
      this.joinedPlayers.push(new Player(name));
    });
    this.socket.on('roomCode', (roomCode) => {
      this.roomCode = roomCode;
    });
  }
}
