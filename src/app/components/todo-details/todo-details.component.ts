import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/services/overlay.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';


interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  todoForm = new FormGroup({
    title: new FormControl(this.oS.currentTodo?.title),
    description: new FormControl(this.oS.currentTodo?.description),
    completed: new FormControl(this.oS.currentTodo?.completed)
  });

  youShallNotPass = true;


  constructor(
    private router: Router,
    public oS: OverlayService,
    private http: HttpClient
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


  async updateTodo() {
    let todo = this.addChangeS();
    const url = environment.baseUrl + '/api/todos/' + this.oS.currentTodo?.id + '/';
    await lastValueFrom(this.http.put<any>(url, todo));
    this.oS.setObservableTrue();
    this.close();
  }


  addChangeS() {
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
