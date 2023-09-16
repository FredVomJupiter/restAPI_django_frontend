import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('errormessage') errormessage!: HTMLElement;
  username: string = '';
  password: string = 'Error';
  error: string = '';
  visible: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }


  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', resp.token);
      if (resp.token === undefined) {
        this.handleError();
      } else {
        this.router.navigate(['/todos']);
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  handleError() {
    this.error = 'Wrong username or password';
    this.visible = true;
    setTimeout(() => {this.visible = false;}, 3000);
    throw new Error('No token received');
  }


  async guestLogin() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword('Guest', `8j)'Ga_Kw?YwPbt`);
      localStorage.setItem('token', resp.token);
      if (resp.token === undefined) {
        this.handleError();
      } else {
        this.router.navigate(['/todos']);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
