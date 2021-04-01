import { TestBed } from '@angular/core/testing';

import { DatabaseInterfaceService } from './database-interface.service';

describe('DatabaseInterfaceService', () => {
  let service: DatabaseInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
