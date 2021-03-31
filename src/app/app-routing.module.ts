import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from './_helpers/auth-guard.service';
import {DetailComponent} from './detail/detail.component';
import {HistoricComponent} from './historic/historic.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  // {
  //   path: '**', redirectTo: '404'
  // },
  {
    path: 'home', component: HomeComponent , canActivate: [AuthGuardService]
  },
  {
    path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'historic', component: HistoricComponent, canActivate: [AuthGuardService]
  },
  {
    path: '404', component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
