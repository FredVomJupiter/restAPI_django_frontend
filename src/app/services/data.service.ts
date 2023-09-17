import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos$: Observable<Todo[]> = new Observable<Todo[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(
    private http: HttpClient
    ) {
      this.load();
    }

  
  async load() {
    console.log('loading');
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
    let categories = await this.getCategories();
    this.categories$ = new Observable<Category[]>(subscriber => {
      subscriber.next(categories);
    });
  }


  async getCategories() {
    const url = environment.baseUrl + '/api/v1/categories/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getTodos() {
    const url = environment.baseUrl + '/api/v1/todos/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async createCategory(category: Category) {
    const url = environment.baseUrl + '/api/v1/categories/';
    const body = category;
    await lastValueFrom(this.http.post<any>(url, body));
    let categories = await this.getCategories();
    this.categories$ = new Observable<Category[]>(subscriber => {
      subscriber.next(categories);
    });
  }


  async createTodo(data: Todo) {
    const url = environment.baseUrl + '/api/v1/todos/';
    await lastValueFrom(this.http.post<any>(url, data));
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
  }


  async updateTodoById(data: Todo) {
    const url = environment.baseUrl + '/api/v1/todos/' + data.id + '/';
    await lastValueFrom(this.http.put<any>(url, data));
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
  }


  async deleteTodoById(id: number) {
    const url = environment.baseUrl + '/api/v1/todos/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
  }
}
