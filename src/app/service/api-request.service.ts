import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { QrCode } from '../interface/qr-code';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private httpClient: HttpClient) {}

  //Define API
  private domainName = 'http://localhost:3000';


  getOne(id): Observable<QrCode>{
    return this.httpClient.get<QrCode>(this.domainName + '/' + id);
  }

}
