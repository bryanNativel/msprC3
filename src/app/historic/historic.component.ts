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
  // public historicQrCode: QrCode[];

  public historicQrCode: QrCode[] = [{brand: 'IKEA', description: '30% de réduction sur des chaises de bureau',
    coupon: 'https://www.creerentreprise.fr/wp-content/uploads/2016/07/code-barre.png', id: '1', validUntil: new Date()}, {brand: 'FNAC', description: '25% de réduction sur des ordinateurs',
    coupon: 'https://www.creerentreprise.fr/wp-content/uploads/2016/07/code-barre.png', id: '2', validUntil: new Date()},{brand: 'MICROMANIA', description: '5% de réduction sur des PS5',
    coupon: 'https://www.creerentreprise.fr/wp-content/uploads/2016/07/code-barre.png', id: '3', validUntil: new Date()},{brand: 'SPORT 2000', description: '70% de réduction sur des baskettes NIKE',
    coupon: 'https://www.creerentreprise.fr/wp-content/uploads/2016/07/code-barre.png', id: '4', validUntil: new Date()}];
  ngOnInit() {
   //
   //  const qrcodeObject =  this.serviceRequest.getQrCodeHistoric('1').subscribe( {
   //    next: value => console.log(this.historicQrCode = value),
   //    error: error => console.error(error),
   //    complete: () => qrcodeObject.unsubscribe(),
   // });
  }

}

