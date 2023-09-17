import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Todo } from 'src/app/models/todo.model';


interface Category {
  name: string;
  color: string;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  

  title: string = '';
  description: string = '';
  status: boolean = false;
  category: Category = { name: '', color: '' };

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
    public dataService: DataService
    ) { }


  openCategoryForm() {
    this.category = { name: '', color: '' };
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


  displayColor(e: any) {
    console.log(e.target.value.split(','));
    let color = e.target.value.split(',')[1];
    e.target.style.color = color;
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
