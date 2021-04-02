import {Component, NgZone, OnInit} from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { QrCodeRequestService } from '../service/qrCode-request.service';
import {HttpErrorResponse} from "@angular/common/http";
import {HistoricService} from "../service/database/historic.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    public toastController: ToastController,
    private serviceQrCode: QrCodeRequestService,
    private historicService: HistoricService,
    private authService: AuthService,
    private zone: NgZone
  ) {}
  showCamera = false;

  public userId: number = this.authService.getUserId() || 1;

  ngOnInit() {
  }

  public scanQrCode(): void {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.showCamera = true;
          const scanSub = this.qrScanner.scan().subscribe((id: string) => {
            scanSub.unsubscribe();
            this.closeCamera()
            const idConvert = parseInt(id, null);
            this.serviceQrCode.getOne(id).subscribe(
              (coupon) => {
                this.historicService.create({couponId: +coupon.id, scannedBy: this.userId})
              },
              (err) => {
                console.log(err.error)
                const errorMessage = (err as HttpErrorResponse).error !== undefined ? `${err.error.statusCode} ${err.error.error}` : 'Un problème est survenue avec le serveur.'
                this.presentToastWithOptions(errorMessage);
              },
              () => {
                this.zone.run(() => this.router.navigate(['/detail', idConvert]))

              }
            );
          });
        } else if (status.denied) {
          this.presentToastWithOptions(
            'camera permission was permanently denied.'
          );
        } else {
          this.presentToastWithOptions(
            "l'autorisation a été refusée, mais pas de façon permanente. Vous pouvez demander à nouveau l'autorisation ultérieurement."
          );
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeCamera(): void {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }
  async presentToastWithOptions(errorMessage) {
    const toast = await this.toastController.create({
      header: 'Message :',
      color: 'danger',
      message: errorMessage,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'warning',
          text: 'Erreur',
          handler: () => {
            // console.log('Favorite clicked');
          },
        },
        {
          text: 'Fermer',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();
  }
}
