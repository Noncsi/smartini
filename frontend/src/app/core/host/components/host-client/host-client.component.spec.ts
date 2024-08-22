import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostClientComponent } from './host-client.component';

describe('HostClientComponent', () => {
  let component: HostClientComponent;
  let fixture: ComponentFixture<HostClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
