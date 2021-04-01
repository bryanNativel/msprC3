import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {QrCode} from '../interface/qr-code';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrCodeRequestService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = environment.apiUrl;
  private apiEndpoint = '/coupon';

  getOne(id: string): Observable<QrCode>{
    return this.httpClient.get<QrCode>(`${this.apiUrl}${this.apiEndpoint}/${id}`);
  }
  getAll(): Observable<QrCode[]> {
    return this.httpClient.get<QrCode[]>(`${this.apiUrl}${this.apiEndpoint}`);
  }
  getQrCodeHistoric(userId: string): Observable<QrCode[]>{
    return this.httpClient.get<QrCode[]>(this.apiUrl + '/historic/' +  userId);
  }
  createCoupon(coupon: QrCode): Observable<QrCode>{
    return this.httpClient.post<QrCode>(this.apiUrl + '/coupon', coupon);
  }
  createCouponMultiple(coupons: QrCode[]): Observable<QrCode[]>{
    return this.httpClient.post<QrCode[]>(this.apiUrl + '/coupon/batch', coupons);
  }

}
