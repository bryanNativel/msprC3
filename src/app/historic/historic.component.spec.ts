import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HistoricComponent } from './historic.component';
import {QrCode} from '../interface/qr-code';


describe('HistoricComponent', () => {
  let component: HistoricComponent;
  let fixture: ComponentFixture<HistoricComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('check if variable observable return qrcode array if', () => {
    const serviceQrCode = component.qrcodeObject();
    serviceQrCode.subscribe((res) => {
      expect(res).toBeDefined(Array<QrCode>());
    });
  });

  it('check if variable observable return null if error', () => {
    const serviceQrCode = component.qrcodeObject();
    serviceQrCode.subscribe((res) => {
      expect(res).toBeDefined(null);
    });
  });
});
