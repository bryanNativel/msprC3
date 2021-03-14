import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }


  ngOnInit() {}

  login() {
    const val = this.form.value

    if(val.email && val.password){
      this.authService.login(val.email,val.password).subscribe(()=>{
         console.log("connexion work")
          this.router.navigateByUrl('home');
        },
        (error)=>{
          console.log("error connexion");
        },
      )
    }


  }
}
