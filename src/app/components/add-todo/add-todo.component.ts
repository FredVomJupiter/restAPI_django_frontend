import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';

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
  categoryFormVisible: boolean = false;
  

  title: string = '';
  description: string = '';
  status: boolean = false;
  category: string = '';

  todoForm = new FormGroup({
    title: new FormControl(this.title, Validators.required),
    description: new FormControl(this.description, Validators.required),
    completed: new FormControl(this.status),
    category: new FormControl(this.category, Validators.required)
  });

  youShallNotPass: boolean = true;

  constructor(
    public oS: OverlayService,
    private router: Router,
    private dataService: DataService
    ) { }


  async ngOnInit(): Promise<void> {
    this.categories = await this.dataService.getCategories().then((data) => {
      return data;
    });
  }


  openCategoryForm() {
    this.category = '';
    this.oS.categoryOverlayVisible = true;
  }


  async create() {
    if (this.todoForm.valid) {
      this.dataService.createTodo(this.todoForm.value as Todo)
      this.oS.setSubjectTrue();
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
