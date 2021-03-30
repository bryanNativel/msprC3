import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {User} from '../interface/user';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController) {

    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      subHeader: 'Erreur de connexion',
      message: 'Le mot de passe ou l\'email sont incorrect ',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: '',
      message: 'Connexion...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  login() {
    const val = this.form.value

    if(val.email && val.password){

      this.authService.login(val).subscribe(()=>{
         console.log("connexion work")
          // this.router.navigateByUrl('home');
        console.log(this.authService.getToken())
        this.authService.logout();
          console.log(this.authService.getToken())

        },
        (error)=>{
          console.log("error connexion");
        },
      )
    }
  }
}
