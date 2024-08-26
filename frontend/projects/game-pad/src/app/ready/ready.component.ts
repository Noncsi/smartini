import { Component } from '@angular/core';
import { IoService } from '../../../io.service';

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
})
export class ReadyComponent {
  constructor(private ioService: IoService) {}
  ready() {
    this.ioService.markAsReady();
  }
}
