import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindDetailsComponent } from './remind-details.component';

describe('RemindDetailsComponent', () => {
  let component: RemindDetailsComponent;
  let fixture: ComponentFixture<RemindDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemindDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
