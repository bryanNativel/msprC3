import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  constructor(private formControl: FormControl) { }
  form: FormControl;
  ngOnInit() {}

  login() {
  console.log(this.form)
  }
}
