import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from './detail.component';
import {QrCode} from '../interface/qr-code';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

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
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('check if variable containing observable qrcode type', () => {
    component.ngOnInit();
    const result = component.qrCode$;
    expect(result).toContain (new Observable<QrCode>());
  });
});
