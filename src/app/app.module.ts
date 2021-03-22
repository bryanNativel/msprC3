import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {DetailComponent} from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  declarations: [AppComponent, DetailComponent, HomeComponent],
  entryComponents: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

