import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-client',
  templateUrl: './player-client.component.html',
  styleUrl: './player-client.component.scss',
})
export class PlayerClientComponent implements OnInit {
  players: string[] = [];
  socket: WebSocket = new WebSocket('ws://192.168.0.103:8080');

  ngOnInit(): void {
    this.socket.onmessage = (a) => {
      this.players.push(a.data);
    };
    this.socket.onclose = (e) => {
      console.log('Disconnected from WebSocket server');
    };
  }

  join(name: string) {
    this.socket.send(JSON.stringify(name));
  }
}
