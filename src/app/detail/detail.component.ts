import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../service/api-request.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  constructor(private service: ApiRequestService) {}

  ngOnInit() {

  }

}
