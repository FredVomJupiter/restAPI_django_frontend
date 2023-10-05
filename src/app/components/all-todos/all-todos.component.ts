import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Todo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit, OnDestroy {

  creating: boolean = false;

  showPromt: boolean = false;
  todoID: number | null = null;


  constructor(
    private router: Router,
    public oS: OverlayService,
    public dataService: DataService
    ) { }


  async ngOnInit(): Promise<void> {
    console.log("Init all component");
  }


  ngOnDestroy() {
    console.log("Destroy all component");
  }


  async delete() {
    await this.dataService.deleteTodoById(this.todoID!);
    this.closePromt();
  }


  viewTodo(todo: Todo) {
    this.oS.currentTodo = todo;
    this.router.navigate(['/todos/', todo.id]);
  }


  openForm() {
    this.router.navigate(['/todos/add']);
  }
  

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  openPromt(id: number, $event: any) {
    $event.stopPropagation();
    this.todoID = id;
    this.showPromt = true;  
  }


  closePromt() {
    this.todoID = null;
    this.showPromt = false;
  }

}
