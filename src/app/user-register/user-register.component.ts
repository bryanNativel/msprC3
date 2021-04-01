import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(private fb: FormBuilder , private authService: AuthService, private router: Router, public toastController: ToastController) {

    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async presentToastWithOptions(errorMessage) {
    const toast = await this.toastController.create({
      header: 'Message :',
      color: 'danger',
      message: errorMessage,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'warning',
          text: 'Erreur',
          handler: () => {
            //console.log('Favorite clicked');
          }
        }, {
          text: 'Fermer',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  register(){

   const value =  this.formRegister.value;
   if (this.formRegister.valid){
     this.authService.register(value).subscribe(_ => {
       this.router.navigate(['login']);
     }, err => {
       this.presentToastWithOptions(err.message || "une erreur est survenu");
     });
    }
  }

  /**
   * Check if form input is required
   * @param formInput Form control
   */
  formInputIsRequired(formInput: string) {
    if (this.formRegister.controls[formInput]) {
      if (this.formRegister.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }


}
