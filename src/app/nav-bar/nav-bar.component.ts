import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {AuthService} from '../service/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(private menu: MenuController, private route: ActivatedRoute, private router: Router, private serviceAuth: AuthService) {

  }
  pageName: string;
  checkLogin: boolean;

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.pageName = data.state.root.firstChild.data.title;
      }
    });
    this.checkLogin = this.serviceAuth.loggedIn;
  }

  logout() {
    this.serviceAuth.logout();
  }

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
