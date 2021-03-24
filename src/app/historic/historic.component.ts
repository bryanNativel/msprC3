import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {QrCode} from '../interface/qr-code';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  constructor(private serviceRequest: QrCodeRequestService) {}
  historicQrCode: QrCode[];
  ngOnInit() {

    const qrcodeObject =  this.serviceRequest.getHistoric('1').subscribe( {
      next: value => console.log(this.historicQrCode = value),
      error: error => console.error(error),
      complete: () => qrcodeObject.unsubscribe(),
   });
  }

}
