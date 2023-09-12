import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }


  async loginWithUsernameAndPassword() {
    const requestOptions = this.getSettings();

    try {
      let resp = await fetch("http://127.0.0.1:8000/login/", requestOptions);
      let data = await resp.json();
      localStorage.setItem('token', data.token);
      if (data.token === undefined) {
        this.error = 'Wrong username or password';
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000);
        throw new Error('No token received');
      } else {
      this.router.navigate(['/alltodos']);
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  getSettings() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username,
      "password": this.password
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return requestOptions;
  }
}
