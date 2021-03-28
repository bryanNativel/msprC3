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
    // return of([{
    //   id: '1',
    //   brand: 'marque1',
    //   description: 'C\'est und description de ouf malade',
    //   coupon: 'https://pbs.twimg.com/profile_images/1223360351762182144/N_crIksv_400x400.jpg',
    // },
    //   {
    //     id: '2',
    //     brand: 'marque2',
    //     description: 'C\'est und description de ouf malade',
    //     coupon: 'https://pbs.twimg.com/profile_images/1223360351762182144/N_crIksv_400x400.jpg',
    //   },
    //   {
    //     id: '3',
    //     brand: 'marque3',
    //     description: 'C\'est und description de ouf malade',
    //     coupon: 'https://pbs.twimg.com/profile_images/1223360351762182144/N_crIksv_400x400.jpg',
    //   }]);
     return this.httpClient.get<QrCode[]>(this.apiUrl + '/historic/' +  userId);
  }

}
