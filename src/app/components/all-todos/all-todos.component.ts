import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  sub!: Subscription;

  constructor(
    private router: Router,
    public oS: OverlayService,
    public dataService: DataService
    ) { }


  async ngOnInit(): Promise<void> {
    this.sub = this.oS.subject.subscribe(async (data) => {
      if (data) {
        this.oS.setSubjectFalse();
      }
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  async delete(id: number, $event: any) {
    $event.stopPropagation();
    await this.dataService.deleteTodoById(id);
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

}
