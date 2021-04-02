import { Component, OnInit } from '@angular/core';
import {QrCodeRequestService} from '../service/qrCode-request.service';
import {QrCode} from '../interface/qr-code';
import {HistoricService} from "../service/database/historic.service";
import {Observable} from "rxjs";
import {IHistoric} from "../interface/ihistoric";
import {concatMap, filter, flatMap, map} from "rxjs/operators";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
})
export class HistoricComponent implements OnInit {

  constructor(private serviceRequest: QrCodeRequestService, private historicDao: HistoricService, private authService: AuthService) {}
  public historicQrCode$: Observable<IHistoric[]>;
  public userId: number

  ngOnInit() {
    this.userId = 1 //this.authService.getUserId()
    this.historicQrCode$ = this.userId ? this.historicDao.getAllForUser(this.userId) : this.historicDao.getAll()
  }

 }
