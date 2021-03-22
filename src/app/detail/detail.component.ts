import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {QrCodeRequestService} from '../service/qrCode-request.service';
>>>>>>> b132120 (fixed request edit)
import {ActivatedRoute} from '@angular/router';
import {QrCode} from '../interface/qr-code';
import {Observable} from 'rxjs';
import {ApiRequestService} from '../service/api-request.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private qrCode$: Observable<QrCode>;

  constructor(private service: QrCodeRequestService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.qrCode$ = this.service.getOne(id);
  }
}
