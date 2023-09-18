import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/services/overlay.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  constructor(
    private router: Router,
    public oS: OverlayService,
    public dataService: DataService
  ) { }


  getDateString() {
    let date: string = String(this.oS.currentTodo?.due_date).substring(0, 10);
    return date;
  }


  openEditor() {
    this.oS.detailOverlayVisible = false;
    this.oS.updateOverlayVisible = true;
    this.router.navigate(['/todos/update']);
  }
  

  noBubble($event: any) {
    $event.stopPropagation();
  }


  close() {
    this.oS.currentTodo = null;
    this.oS.detailOverlayVisible = false;
    this.router.navigate(['/todos']);
  }
}
