import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private loadingController: LoadingController) { }
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {

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
  register(): void{
    const value = this.form.value;
    if (value.email && value.password && value.name){
        this.authService.register(value).subscribe(() => {
          this.router.navigateByUrl('login');
        });
    }
  }

}
