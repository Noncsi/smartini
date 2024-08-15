import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-client',
  templateUrl: './host-client.component.html',
  styleUrl: './host-client.component.scss',
})
export class HostClientComponent implements OnInit {
  roomId: number = 123;
  joinedPlayers: string[] = [];

  ngOnInit(): void {
    let socket: WebSocket = new WebSocket('ws://192.168.0.103:8080');

    socket.onopen = () => console.log('Room is ready for players.');
    socket.onmessage = (e: MessageEvent) => {
      console.log('message got', e);
      this.joinedPlayers.push(e.data);
    };
  }
}
