import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { OverlayService } from 'src/app/services/overlay.service';
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

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  categories!: string[];

  title: string = '';
  description: string = '';
  status: boolean = false;
  category: string = '';

  todoForm = new FormGroup({
    title: new FormControl(this.title, Validators.required),
    description: new FormControl(this.description, Validators.required),
    completed: new FormControl(this.status),
    category: new FormControl(this.category, Validators.required),
  });

  youShallNotPass: boolean = true;

  constructor(
    public oS: OverlayService,
    private router: Router,
    private http: HttpClient
    ) { }


  async ngOnInit(): Promise<void> {
    this.categories = await this.getCategories().then((data) => {
      return data;
    });
  }


  async getCategories() {
    const url = environment.baseUrl + '/api/v1/categories/';
    return await lastValueFrom(this.http.get<any>(url));
  }


  createCategory() {
    console.log('create category');
    
    console.log(this.category);
  }


  async create() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
      const url = environment.baseUrl + '/api/v1/todos/';
      await lastValueFrom(this.http.post<any>(url, this.todoForm.value));
      this.oS.setObservableTrue();
      this.closeForm();
      
    } else {
      console.log('invalid form');
    }
  }

  
  closeForm() {
    this.todoForm.reset();
    this.oS.addOverlayVisible = false;
    this.router.navigate(['/todos']);
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }

  checkForm() {
    if (this.todoForm.valid) {
      this.youShallNotPass = false;
    } else {
      this.youShallNotPass = true;
    }
  }
}
