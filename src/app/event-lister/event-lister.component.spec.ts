import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListerComponent } from './event-lister.component';

describe('EventListerComponent', () => {
  let component: EventListerComponent;
  let fixture: ComponentFixture<EventListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
