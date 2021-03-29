import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {ActivatedRoute} from '@angular/router';
import {QrCode} from '../interface/qr-code';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private qrCode$: Observable<QrCode>;

  constructor(private serviceRequest: QrCodeRequestService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.qrCode$ = this.serviceRequest.getOne(id).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status == 404) {
        console.log("Coupon with id "+ id +" Not found")
        return of(null)
      }else {
        return throwError(err)
      }
    }))
  }
}
