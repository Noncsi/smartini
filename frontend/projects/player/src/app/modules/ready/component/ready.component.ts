import { Component } from '@angular/core';
import { ReadyService } from '../service/ready.service';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
})
export class ReadyComponent {
  constructor(private readyService: ReadyService) {}
  ready() {
    this.readyService.setReady();
  }
}
