import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environements/environements.dev';
import {QrCode} from '../interface/qr-code';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeRequestService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getOne(id: string): Observable<QrCode>{
    return this.httpClient.get<QrCode>(this.apiUrl + '/qr-code/' +  id);
  }
  getHistoric(userId: string): Observable<QrCode>{
    return of([{
      id: '1',
      brand: 'marque1',
      description: 'C\'est und description de ouf malade',
      validUntil: '15-30-65',
      coupon: 'https://normapremier.com/wp-content/uploads/2017/08/ean13-300x135.png',
    },
      {
        id: '2',
        brand: 'marque2',
        description: 'C\'est und description de ouf malade',
        validUntil: '15-30-65',
        coupon: 'https://normapremier.com/wp-content/uploads/2017/08/ean13-300x135.png',
      },
      {
        id: '3',
        brand: 'marque3',
        description: 'C\'est und description de ouf malade',
        validUntil: '15-30-65',
        coupon: 'https://normapremier.com/wp-content/uploads/2017/08/ean13-300x135.png',
      }]);
    // return this.httpClient.get<QrCode>(this.apiUrl + '/historic/' +  userId);
  }
}
