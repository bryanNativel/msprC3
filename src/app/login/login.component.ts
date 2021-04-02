import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.form = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        () => {
          this.router.navigateByUrl('home');
        },
        (error) => {
          this.presentToastWithOptions(error.substring(0,20) + '...' || 'Impossible de communiquer avec le serveur.');
        }
      );
    }
  }

  /**
   * Check if form input is required
   * @param formInput Form control
   */
  formInputIsRequired(formInput: string) {
    if (this.form.controls[formInput]) {
      if (this.form.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }
  async presentToastWithOptions(errorMessage) {
    const toast = await this.toastController.create({
      header: 'Une erreur est survenue',
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
          },
        },
        {
          text: 'fermer',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();
  }
}
