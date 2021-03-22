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

    //const mockQrCode: QrCode = {id: '1', name: 'Micro mania', description:"-30% sur la nouvel P55!", date:new Date(Date.now())}
    //return of(mockQrCode)
    return this.httpClient.get<QrCode>(this.domainName + '/' + id);
  }

}
