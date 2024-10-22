import { TestBed } from '@angular/core/testing';

import { RemindsServiceService } from './reminds-service.service';

describe('RemindsServiceService', () => {
  let service: RemindsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemindsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
