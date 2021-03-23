import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor(private menu: MenuController, private route: ActivatedRoute, private router: Router) {

  }
  pageName: string;
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.pageName = data.state.root.firstChild.data.title;
      }
    });
  }

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
