import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {
 
  addOverlayVisible: boolean = false;
  detailOverlayVisible: boolean = false;
  updateOverlayVisible: boolean = false;
  categoryOverlayVisible: boolean = false;
  
  currentTodo: Todo | null = null;

  subject = new Subject<boolean>();
  categorySubject = new Subject<boolean>();

  constructor() { }


  setSubjectTrue() {
    this.subject.next(true);
  }


  setSubjectFalse() {
    this.subject.next(false);
  }


  setCategorySubjectTrue() {
    this.categorySubject.next(true);
  }


  setCategorySubjectFalse() {
    this.categorySubject.next(false);
  }


}
