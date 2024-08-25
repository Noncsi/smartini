import { Component } from '@angular/core';
import { IoService } from '../../../../io.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent {
  constructor(private ioService: IoService) {}

  join(room: string, name: string) {
    this.ioService.connectGamePad(room, name);
  }
}
