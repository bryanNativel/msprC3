import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {QrCode} from '../interface/qr-code';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  constructor(private serviceRequest: QrCodeRequestService) {}
  public historicQrCode: QrCode[];
  ngOnInit() {
  }

  qrcodeObject = () =>  this.serviceRequest.getQrCodeHistoric('1').subscribe( {
  next: value => this.historicQrCode = value,
  error: error => this.historicQrCode = error,
  complete: () => this.qrcodeObject().unsubscribe(),

}

  )}
