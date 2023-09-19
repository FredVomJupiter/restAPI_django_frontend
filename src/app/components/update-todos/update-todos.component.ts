import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  selector: 'app-update-todos',
  templateUrl: './update-todos.component.html',
  styleUrls: ['./update-todos.component.scss']
})
export class UpdateTodosComponent implements OnInit {

  youShallNotPass = true;
  routeId = '';

  constructor(
    public oS: OverlayService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
    if (this.formValuesAreNull()) {
      this.youShallNotPass = true;
    }
  }


  todoForm = new FormGroup({
    title: new FormControl(this.oS.currentTodo?.title),
    description: new FormControl(this.oS.currentTodo?.description),
    completed: new FormControl(this.oS.currentTodo?.completed),
    category: new FormControl(this.oS.currentTodo?.category),
    priority: new FormControl(this.oS.currentTodo?.priority),
    dueDate: new FormControl(this.oS.currentTodo?.due_date),
    assignedTo: new FormControl(this.oS.currentTodo?.assigned_to),
    subtasks: new FormControl(this.oS.currentTodo?.subtasks)
  });


  formValuesAreNull() {
    return (
      (this.todoForm.value.title === null || this.todoForm.value.title === '')
      && (this.todoForm.value.description === null || this.todoForm.value.description === '')
      && this.todoForm.value.completed === null
    );
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
    this.oS.updateOverlayVisible = false;
    this.oS.detailOverlayVisible = true;
    this.location.back();
  }
}
