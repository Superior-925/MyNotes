import { TestBed } from '@angular/core/testing';

import { InMemoryDataRemindsService } from './in-memory-data-reminds.service';

describe('InMemoryDataRemindsService', () => {
  let service: InMemoryDataRemindsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataRemindsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
