import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environements/environements.dev'
import {QrCode} from '../interface/qr-code';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeRequestService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = environment.apiUrl+'/qr-code';

  getOne(id:string): Observable<QrCode>{
    return this.httpClient.get<QrCode>(this.apiUrl + '/' +  id);
  }
}
