import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './_helpers/auth-guard.service';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {

    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    //Exemple de route Guard
    //path:'home',component:home canActivate: [AuthGuardService]
  },
  {
    path:'register',component: RegisterComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
