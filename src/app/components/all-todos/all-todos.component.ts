import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent {

  constructor(private router: Router) { }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
