import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {DetailComponent} from './detail/detail.component';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './_helpers/jwt-interceptor.service';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent, DetailComponent, HomeComponent,LoginComponent],
  entryComponents: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,ReactiveFormsModule], 
  bootstrap: [AppComponent],
})
export class AppModule {}

