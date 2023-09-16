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
  currentTodo: Todo | null = null;

  subject = new Subject<boolean>();

  constructor() { }


  setObservableTrue() {
    this.subject.next(true);
  }


  setObservableFalse() {
    this.subject.next(false);
  }

}
