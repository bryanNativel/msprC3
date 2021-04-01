import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from './detail.component';
import {QrCode} from '../interface/qr-code';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  const coupon1: QrCode = {brand: 'Marque1', description: 'description1', id: '1' , coupon: 'https://www.haoui.com/newsletter/2016/octobre18/saviezvous2/s2.jpg', validUntil: new Date('10/05/2121')};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              id: '1',
            },
          },
        },
      },
      ],
      declarations: [ DetailComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('check if variable containing observable qrcode type', () => {
    component.ngOnInit();
    component.qrCode$.subscribe(result => {
      expect(result).toContain(coupon1);
    });
  });
});
