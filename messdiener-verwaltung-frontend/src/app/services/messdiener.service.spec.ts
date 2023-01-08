import { TestBed } from '@angular/core/testing';

import { MessdienerService } from './messdiener.service';

describe('MessdienerService', () => {
  let service: MessdienerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessdienerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
