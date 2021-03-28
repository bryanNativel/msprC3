import { TestBed } from '@angular/core/testing';

import { QrCodeRequestService } from './qrCode-request.service';
import {QrCode} from '../interface/qr-code';
import {Observable} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';

describe('QrCodeRequestService', () => {
  let service: QrCodeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(QrCodeRequestService);
  });

  it('check if getall work', () => {
    expect(service.getAll()).toEqual(new Observable<QrCode>());
  });
});
