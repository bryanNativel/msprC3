import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DetailComponent} from './detail/detail.component';


const routes: Routes = [
  {
<<<<<<< HEAD
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
=======
    path: 'detail/:id',component:DetailComponent
>>>>>>> b132120 (fixed request edit)

  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
