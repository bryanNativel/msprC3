import { TestBed } from '@angular/core/testing';

import { QrCodeRequestService } from './qrCode-request.service';

describe('QrCodeRequestService', () => {
  let service: QrCodeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCodeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
