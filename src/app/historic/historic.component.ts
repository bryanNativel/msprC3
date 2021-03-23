import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {Observable} from 'rxjs';
import {QrCode} from '../interface/qr-code';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  constructor(private serviceRequest: QrCodeRequestService) {}
  historicQrCode: any;
  ngOnInit() {
    // Recuperer id du user connecter dans le locale storage
   this.historicQrCode = this.serviceRequest.getHistoric('1');
   console.log(this.historicQrCode);
  }

}
