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
  password: string = '';
  error: string = 'Error';
  visible: boolean = false;
  loading: boolean = false;
  active: boolean = true;

  constructor(private router: Router, private authService: AuthService) { }


  async login() {
    this.handleActivationAndAnimation();
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
      this.loading = false;
      this.visible = true;
      console.error(error);
      this.error = 'Login failed, check internet connection...'
    }
  }


  async guestLogin() {
    this.handleActivationAndAnimation();
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
      this.loading = false;
      this.visible = true;
      console.error(error);
      this.error = 'Login failed, check internet connection...'
    }
  }


  handleActivationAndAnimation() {
    if (this.active === false) {
      return;
    }
    this.loading = true;
  }


  handleError() {
    this.loading = false;
    this.error = 'Wrong username or password';
    this.visible = true;
    setTimeout(() => {this.visible = false;}, 3000);
    throw new Error('No token received');
  }  
}
