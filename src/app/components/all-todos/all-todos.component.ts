import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent {

  todos: any = [];

  constructor(private router: Router, private http: HttpClient) { }


  async ngOnInit(): Promise<void> {
    this.todos = await this.getTodos().then((data) => {
      return data.sort((a: any, b: any) => {
        return a.id - b.id;
      });
    });
  }


  getTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get<any>(url));
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
