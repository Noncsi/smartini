import { Component, OnInit } from '@angular/core';
import { IoService } from '../../../../io.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-host-client',
  templateUrl: './host-client.component.html',
  styleUrl: './host-client.component.scss',
})
export class HostClientComponent implements OnInit {
  socket: Socket | undefined;
  roomId: number = 0;
  joinedPlayers: string[] = [];
  error = '';

  constructor(private ioService: IoService) {}

  ngOnInit(): void {
    this.socket = this.ioService.joinHost();
    this.socket.on('newPlayer', (name) => {
      this.joinedPlayers.push(name);
      this.error = 'players: ' + this.joinedPlayers.length;
    });
    this.socket.on('roomCode', (roomCode) => {
      this.roomId = roomCode;
    });
  }
}
