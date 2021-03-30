import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtInterceptorService } from './_helpers/jwt-interceptor.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {DetailComponent} from './detail/detail.component';
import {HistoricComponent} from './historic/historic.component';
import {LoginComponent} from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [AppComponent, DetailComponent, HomeComponent, LoginComponent, NavBarComponent, HistoricComponent, PageNotFoundComponent],
  entryComponents: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

