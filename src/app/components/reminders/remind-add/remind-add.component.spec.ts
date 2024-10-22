import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindAddComponent } from './remind-add.component';

describe('RemindAddComponent', () => {
  let component: RemindAddComponent;
  let fixture: ComponentFixture<RemindAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemindAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
