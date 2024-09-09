import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailScorecardComponent } from './email-scorecard.component';

describe('EmailScorecardComponent', () => {
  let component: EmailScorecardComponent;
  let fixture: ComponentFixture<EmailScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailScorecardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
