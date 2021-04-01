import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(private fb: FormBuilder , private authService: AuthService, private router: Router) {

    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  register(){

   const value =  this.formRegister.value;
   console.log(value);
   if (value.email && value.password && value.name){
     console.log('yes');
     this.authService.register(value);
    }
  }


}
