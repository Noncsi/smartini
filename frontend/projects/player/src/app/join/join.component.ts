import { Component } from '@angular/core';
import { IoService } from '../../../io.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [CardModule, InputTextModule, ButtonModule],
})
export class JoinComponent {
  constructor(private ioService: IoService) {}

  join(room: string, name: string) {
    this.ioService.joinRoom(room, name);
  }
}
