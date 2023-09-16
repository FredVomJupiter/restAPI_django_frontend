import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  category: string;
  priority: string;
  due_date: Date;
  assigned_to: string[];
  subtasks: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  overlayVisible: boolean = false;
  addOverlayVisible: boolean = false;
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
