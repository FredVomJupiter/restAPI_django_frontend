import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { OverlayService } from 'src/app/services/overlay.service';
import { environment } from 'src/environments/environment';


interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];
  creating: boolean = false;

  sub!: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    public oS: OverlayService,
    ) { }


  async ngOnInit(): Promise<void> {
    this.loadTodos();
    this.sub = this.oS.subject.subscribe((data) => {
      if (data) {
        this.loadTodos();
        this.oS.setObservableFalse();
      }
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  async loadTodos() {
    this.todos = await this.getTodos().then((data) => {
      return data.sort((a: any, b: any) => {
        return a.id - b.id;
      });
    });
  }


  async getTodos() {
    const url = environment.baseUrl + '/api/todos/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async delete(id: number, $event: any) {
    $event.stopPropagation();
    const url = environment.baseUrl + '/api/todos/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    this.loadTodos();
  }


  viewTodo(todo: Todo) {
    this.oS.currentTodo = todo;
    this.router.navigate(['/todos/', todo.id]);
    this.oS.overlayVisible = true;
  }


  openForm() {
    this.router.navigate(['/todos/add']);
    this.oS.addOverlayVisible = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
