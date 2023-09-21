import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/services/overlay.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    public oS: OverlayService,
    public dataService: DataService
  ) { }


  ngOnInit(): void {
    console.log("Init detail component");
    console.log("the current todo: ", this.oS.currentTodo);
  }


  ngOnDestroy(): void {
    console.log("destroying detail component");
  }


  getDateString() {
    let date: string = String(this.oS.currentTodo?.due_date).substring(0, 10);
    return date;
  }


  openEditor() {
    console.log("current Todo:", this.oS.currentTodo)
    // Creating a deep copy of the currentTodo object to avoid mutating the original object
    this.oS.subtasks = [...this.oS.currentTodo?.subtasks || []];
    this.router.navigate(['/todos/update']);
  }
  

  noBubble($event: any) {
    $event.stopPropagation();
  }


  close() {
    this.oS.currentTodo = null;
    this.router.navigate(['/todos']);
  }
}
