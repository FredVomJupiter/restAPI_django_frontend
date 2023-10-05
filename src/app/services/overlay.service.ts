/**
 * @desc Service for managing the visibility of the overlay components
 * and for passing data between components and storing temporary data
 * for the update and add components.
 */

import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Subtask } from '../models/subtask.model';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {
 
  categoryOverlayVisible: boolean = false;
  contactOverlayVisible: boolean = false;
  
  currentTodo: Todo | null = null;

  subtasks: number[] = [];
  subtasksFull: Subtask[] = [];

  constructor() { }
}
