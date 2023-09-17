import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/services/overlay.service';
import { DataService } from 'src/app/services/data.service';
import { Todo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  todoForm = new FormGroup({
    title: new FormControl(this.oS.currentTodo?.title),
    description: new FormControl(this.oS.currentTodo?.description),
    completed: new FormControl(this.oS.currentTodo?.completed),
    category: new FormControl(this.oS.currentTodo?.category),
    priority: new FormControl(this.oS.currentTodo?.priority),
    dueDate: new FormControl(this.oS.currentTodo?.due_date),
    assignedTo: new FormControl(this.oS.currentTodo?.assigned_to),
    subtasks: new FormControl(this.oS.currentTodo?.subtask)
  });

  youShallNotPass = true;


  constructor(
    private router: Router,
    public oS: OverlayService,
    public dataService: DataService
  ) { }


  ngOnInit(): void {
    if (this.formValuesAreNull()) {
      this.youShallNotPass = true;
    }
  }


  formValuesAreNull() {
    return (
      (this.todoForm.value.title === null || this.todoForm.value.title === '')
      && (this.todoForm.value.description === null || this.todoForm.value.description === '')
      && this.todoForm.value.completed === null
    );
  }


  getDateString() {
    let date: string = String(this.oS.currentTodo?.due_date).substring(0, 10);
    return date;
  }


  async updateTodo() {
    let todo = this.addChanges();
    this.dataService.updateTodoById(todo as Todo);
    this.oS.setSubjectTrue();
    this.close();
  }


  addChanges() {
    let todo = {
      ...this.oS.currentTodo
    };
    this.todoForm.value.title !== null ? todo.title = this.todoForm.value.title : null;
    this.todoForm.value.description !== null ? todo.description = this.todoForm.value.description : null;
    return todo;
  }


  checkForm() {
    if (this.formValuesAreNull()) {
      this.youShallNotPass = true;
    } else {
      this.youShallNotPass = false;
    }
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }


  close() {
    this.oS.currentTodo = null;
    this.oS.overlayVisible = false;
    this.todoForm.reset();
    this.router.navigate(['/todos']);
  }
}
