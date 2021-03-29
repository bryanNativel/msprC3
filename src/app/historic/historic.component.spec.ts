import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HistoricComponent } from './historic.component';
import {QrCode} from '../interface/qr-code';
import {HttpClientModule} from '@angular/common/http';


describe('HistoricComponent', () => {
  let component: HistoricComponent;
  let fixture: ComponentFixture<HistoricComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricComponent],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('check if variable containing array qrcode type', () => {
  //   component.ngOnInit();
  //   const result = component.historicQrCode;
  //   expect(result).toEqual(Array<QrCode>());
  // });
});
