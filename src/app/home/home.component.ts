import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {AppRoutingModule} from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private qrScanner: QRScanner , private router: AppRoutingModule) {
  }

  ngOnInit() {
  }

  public scanQrCode(): void {
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
             const scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);
               // this.router.navigate(['/detail',{id: text}]);
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });
             this.qrScanner.show().then(r => console.log(r));
          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
            console.log("yayaya");
          }
        })
        .catch((e: any) => console.log('Error is', e));
    }
}
