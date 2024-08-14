import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title: string = 'smartini';
  socket: WebSocket = new WebSocket('ws://192.168.0.103:8080');
  message: string = '';
  receivedMessage: string = '';

  ngOnInit(): void {
    this.socket.onopen = (e) => {
      alert('You are Connected to WebSocket Server');
    };

    this.socket.onmessage = (e) => {
      this.receivedMessage = `Received "${e.data}" from server.`;
    };

    this.socket.onclose = (e) => {
      console.log('Disconnected from WebSocket server');
    };
  }

  sendMessage() {
    this.socket.send(this.message);
    this.message = '';
  }
}
