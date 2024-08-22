import { Component, OnInit } from '@angular/core';
import { IoService } from '../../../../io.service';
import { Socket } from 'socket.io-client';
import { Player } from '../../../player/model/player';

@Component({
  selector: 'app-host-client',
  templateUrl: './host-client.component.html',
  styleUrl: './host-client.component.scss',
})
export class HostClientComponent implements OnInit {
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
