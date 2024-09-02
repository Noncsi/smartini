import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAnswerComponent } from './choose-answer.component';

describe('ChooseAnswerComponent', () => {
  let component: ChooseAnswerComponent;
  let fixture: ComponentFixture<ChooseAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
