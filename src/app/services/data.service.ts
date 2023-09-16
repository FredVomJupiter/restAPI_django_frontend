import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  category: string;
  priority: string;
  due_date: Date;
  assigned_to: string[];
  subtasks: string[];
}

interface Category {
  name: string;
  color: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Observable<Todo[]> = new Observable<Todo[]>();
  categories: Observable<Category[]> = new Observable<Category[]>();

  constructor(
    private http: HttpClient
    ) { }

  
  async ngOnInit(): Promise<void> {
    this.todos = await this.getTodos();
    this.categories = await this.getCategories();
  }


  async getCategories() {
    const url = environment.baseUrl + '/api/v1/categories/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getTodos() {
    const url = environment.baseUrl + '/api/v1/todos/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async createCategory(name: string, color: string) {
    const url = environment.baseUrl + '/api/v1/categories/';
    const body = { name: name, color: color }
    await lastValueFrom(this.http.post<any>(url, body));
    this.categories = await this.getCategories();
  }


  async createTodo(data: Todo) {
    const url = environment.baseUrl + '/api/v1/todos/';
    await lastValueFrom(this.http.post<any>(url, data));
    this.todos = await this.getTodos();
  }


  async updateTodoById(data: Todo) {
    const url = environment.baseUrl + '/api/v1/todos/' + data.id + '/';
    await lastValueFrom(this.http.put<any>(url, data));
    this.todos = await this.getTodos();
  }


  async deleteTodoById(id: number) {
    const url = environment.baseUrl + '/api/v1/todos/' + id;
    await lastValueFrom(this.http.delete<any>(url));
    this.todos = await this.getTodos();
  }
}
