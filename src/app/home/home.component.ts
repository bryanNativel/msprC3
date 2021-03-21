import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private qrScanner: QRScanner , private router: Router) {
  }
  showCamera = false;

  ngOnInit() {
    this.scanQrCode();

  }
  public scanQrCode(): void {
    this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            this.showCamera = true;
            const scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);
               // this.router.navigate(['/detail',{id: text}]);
              this.qrScanner.hide();
              scanSub.unsubscribe();
              this.showCamera = false;
            });
             this.qrScanner.show().then(r => console.log(r));
          } else if (status.denied) {
            console.log("camera permission was permanently denied,you must use QRScanner.openSettings() method to guide the user to the settings page");
          } else {
            console.log("permission was denied, but not permanently. You can ask for permission again at a later time.");
          }
        })
        .catch((e: any) => console.log('Error is', e));
    }

  closeCamera() {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }
}
