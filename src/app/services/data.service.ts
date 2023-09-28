import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Todo } from '../models/todo.model';
import { Contact } from '../models/contact.model';
import { Subtask } from '../models/subtask.model';
import { OverlayService } from './overlay.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos$: Observable<Todo[]> = new Observable<Todo[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>();
  contacts$: Observable<Contact[]> = new Observable<Contact[]>();
  subtasks$: Observable<Subtask[]> = new Observable<Subtask[]>();
  user: any;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private oS: OverlayService
  ) {
    this.load();
  }


  async load() {
    this.loading = true;
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
    let categories = await this.getCategories();
    this.categories$ = new Observable<Category[]>(subscriber => {
      subscriber.next(categories);
    });
    this.user = await this.getUser();
    let contacts = await this.getContacts();
    this.contacts$ = new Observable<Contact[]>(subscriber => {
      subscriber.next(contacts);
    });
    let subtasks = await this.getSubtasks();
    this.subtasks$ = new Observable<Subtask[]>(subscriber => {
      subscriber.next(subtasks);
    });
    this.loading = false;
  }


  async getCategories() {
    const url = environment.baseUrl + '/api/v1/categories/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getTodos() {
    const url = environment.baseUrl + '/api/v1/todos/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getContacts() {
    const url = environment.baseUrl + '/api/v1/contacts/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getSubtasks() {
    const url = environment.baseUrl + '/api/v1/subtasks/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getUser() {
    const url = environment.baseUrl + '/api/v1/user/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  async getTodoById(id: number) {
    const url = environment.baseUrl + '/api/v1/todos/' + id;
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


  async createContact(contact: Contact) {
    const url = environment.baseUrl + '/api/v1/contacts/';
    const body = contact;
    await lastValueFrom(this.http.post<any>(url, body));
    let contacts = await this.getContacts();
    this.contacts$ = new Observable<Contact[]>(subscriber => {
      subscriber.next(contacts);
    });
  }


  async createSubtask(subtask: Subtask) {
    const url = environment.baseUrl + '/api/v1/subtasks/';
    const body = subtask;
    return await lastValueFrom(this.http.post<any>(url, body)).then((res) => {
      return res.id;
    });
  }
  

  async createTodo(data: Todo) {
    const url = environment.baseUrl + '/api/v1/todos/';
    await lastValueFrom(this.http.post<any>(url, data));
    let todos = await this.getTodos();
    this.todos$ = new Observable<Todo[]>(subscriber => {
      subscriber.next(todos);
    });
    let subtasks = await this.getSubtasks();
    this.subtasks$ = new Observable<Subtask[]>(subscriber => {
      subscriber.next(subtasks);
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
