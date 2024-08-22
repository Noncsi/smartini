import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPadComponent } from './player-pad.component';

describe('PlayerClientComponent', () => {
  let component: PlayerPadComponent;
  let fixture: ComponentFixture<PlayerPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerPadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
