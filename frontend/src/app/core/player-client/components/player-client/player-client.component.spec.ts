import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerClientComponent } from './player-client.component';

describe('PlayerClientComponent', () => {
  let component: PlayerClientComponent;
  let fixture: ComponentFixture<PlayerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
