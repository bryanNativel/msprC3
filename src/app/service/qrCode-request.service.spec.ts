import { TestBed } from '@angular/core/testing';

import { QrCodeRequestService } from './qrCode-request.service';
import {QrCode} from '../interface/qr-code';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('QrCodeRequestService', () => {
  let service: QrCodeRequestService;

  const coupon1: QrCode = {brand: 'Marque1', description: 'description1', id: '1' , coupon: 'https://www.haoui.com/newsletter/2016/octobre18/saviezvous2/s2.jpg', validUntil: new Date('10/05/2121')};
  const coupon2: QrCode = {brand: 'Marque2', description: 'description2', id: '2' , coupon: 'https://www.haoui.com/newsletter/2016/octobre18/saviezvous2/s2.jpg', validUntil: new Date('10/05/2121')};
  const coupon3: QrCode = {brand: 'Marque3', description: 'description3', id: '3' , coupon: 'https://www.haoui.com/newsletter/2016/octobre18/saviezvous2/s2.jpg', validUntil: new Date('10/05/2121')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QrCodeRequestService);
  });

  it('check if getAll qrCode work', () => {
    service.createCoupon(coupon1).subscribe((result) => expect(result).toEqual(coupon1));
    service.createCouponMultiple([coupon2, coupon3]).subscribe(
      (result) => expect(result).toContain(jasmine.arrayContaining([coupon2, coupon3])));

    service.getAll().subscribe((result) => expect(result).toContain(jasmine.arrayContaining([coupon3, coupon1 , coupon2])));
  });
});
