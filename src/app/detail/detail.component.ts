import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {ActivatedRoute} from '@angular/router';
import {QrCode} from '../interface/qr-code';
import {Observable, of, throwError} from 'rxjs';
import {catchError, finalize, tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {HistoricService} from "../service/database/historic.service";
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  constructor(private serviceRequest: QrCodeRequestService, private route: ActivatedRoute, private historicService: HistoricService, private authService: AuthService) {}
  public qrCode$: Observable<QrCode>;
  ngOnInit() {
    const userId = this.authService.getUserId() || 1
    const id = this.route.snapshot.params.id;
    this.saveInHistory(id, userId)
    this.qrCode$ = this.serviceRequest.getOne(id).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status == 404) {
        console.log("Coupon with id "+ id +" Not found")
        return of(null)
      }else {
        return throwError(err)
      }
    }))

  }

 saveInHistory(couponId: number, userId: number = 1) {
    // TODO
   console.log('save in history : ', couponId,', ', userId)
   return this.historicService.create({couponId, scannedBy: userId})
 }
}
