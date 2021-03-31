import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule {}
