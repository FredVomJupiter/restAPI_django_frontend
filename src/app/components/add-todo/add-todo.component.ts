import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Todo } from 'src/app/models/todo.model';
import { Priority } from 'src/app/models/priority.model';
import { Subtask } from 'src/app/models/subtask.model';
import { Assigned } from 'src/app/models/assigned.model';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {


  title: string = '';
  description: string = '';
  status: boolean = false;
  category: number = 0;
  priority: Priority = { name: 'Low' };
  dueDate: Date = new Date();
  assignedTo: number[] = [];
  subtasks: Subtask[] = this.oS.subtasks;


  todoForm = new FormGroup({
    category: new FormControl(this.category, Validators.required),
    title: new FormControl(this.title, Validators.required),
    description: new FormControl(this.description, Validators.required),
    completed: new FormControl(this.status),
    priority: new FormControl(this.priority, Validators.required),
    dueDate: new FormControl(this.dueDate, Validators.required),
    assignedTo: new FormControl(this.assignedTo, Validators.required),
    subtasks: new FormControl(this.subtasks)
  });

  constructor(
    public oS: OverlayService,
    private router: Router,
    public dataService: DataService
  ) { }


  showFormValues() {
    console.log(this.todoForm.value);
  }


  openCategoryForm() {
    this.category = 0;
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
    let color = e.target.value.split(',')[1];
    e.target.style.color = color;
  }


  isSelected(id: number) {
    return this.assignedTo.includes(id);
  }


  resetAssignments() {
    this.assignedTo = [];
  }


  openContactForm() {
    this.assignedTo = [];
    this.oS.contactOverlayVisible = true;
  }


  deleteSubtask(sub: Subtask) {
    this.oS.subtasks.splice(this.oS.subtasks.indexOf(sub), 1);
  }


  closeForm() {
    this.todoForm.reset();
    this.oS.addOverlayVisible = false;
    this.router.navigate(['/todos']);
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }

}
