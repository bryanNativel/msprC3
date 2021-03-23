import {Observable, of} from 'rxjs';
import { QrCode } from '../interface/qr-code';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private httpClient: HttpClient) {}

  private domainName = 'http://localhost:3000';

  getOne(id: string): Observable<QrCode>{
    return this.httpClient.get<QrCode>(this.domainName + '/' + id);
  }

}
