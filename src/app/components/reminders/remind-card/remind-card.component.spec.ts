import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindCardComponent } from './remind-card.component';

describe('RemindCardComponent', () => {
  let component: RemindCardComponent;
  let fixture: ComponentFixture<RemindCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemindCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
