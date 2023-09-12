import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  email: string = '';
  password: string = '';

  constructor() { }


  login() {
    console.log('login');
    console.log('email:', this.email);
    console.log('password:', this.password);
  }
}
