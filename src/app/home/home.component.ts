import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { QrCodeRequestService } from '../service/qrCode-request.service';

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
    private serviceQrCode: QrCodeRequestService
  ) {}
  showCamera = false;

  ngOnInit() {
    this.scanQrCode();
  }
  public scanQrCode(): void {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.showCamera = true;
          const scanSub = this.qrScanner.scan().subscribe((id: string) => {
            this.qrScanner.hide();
            scanSub.unsubscribe();
            this.showCamera = false;
            const idConvert = parseInt(id, null);
            this.serviceQrCode.getOne(id).subscribe(
              (success) => {
                this.router.navigate(['/detail', idConvert]);
              },
              (err) => {
                this.closeCamera();
                this.presentToastWithOptions(err || 'Une erreur est survenue');
              }
            );
            this.router.navigate(['/detail', id]);
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
