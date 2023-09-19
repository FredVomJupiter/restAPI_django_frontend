import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Todo } from 'src/app/models/todo.model';
import { Subtasks } from 'src/app/models/subtask.model'


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
  priority: number = 1;
  dueDate: Date = new Date();
  assignedTo: any[] = [];


  todoForm = new FormGroup({
    category: new FormControl(this.category, Validators.required),
    title: new FormControl(this.title, Validators.required),
    description: new FormControl(this.description, Validators.required),
    completed: new FormControl(this.status),
    priority: new FormControl(this.priority, Validators.required),
    due_date: new FormControl(this.dueDate, Validators.required),
    assigned_to: new FormControl(this.assignedTo, Validators.required),
    subtasks: new FormControl(this.oS.subtasks)
  });

  constructor(
    public oS: OverlayService,
    private router: Router,
    public dataService: DataService
  ) { }


  showFormValues() {
    this.todoForm.value.subtasks = this.oS.subtasks;
    console.log(this.todoForm.value);
  }


  openCategoryForm() {
    this.category = 0;
    this.oS.categoryOverlayVisible = true;
  }


  async create() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
      await this.dataService.createTodo(this.todoForm.value as Todo)
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


  deleteSubtask(sub: Subtasks) {
    this.oS.subtasks.splice(this.oS.subtasks.indexOf(sub), 1);
  }


  closeForm() {
    this.todoForm.reset();
    this.oS.subtasks = [];
    console.log(this.oS.subtasks);
    console.log(this.todoForm.value);

    this.oS.addOverlayVisible = false;
    this.router.navigate(['/todos']);
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }

}
