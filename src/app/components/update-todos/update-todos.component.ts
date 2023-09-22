import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subtasks } from 'src/app/models/subtask.model';

@Component({
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  selector: 'app-update-todos',
  templateUrl: './update-todos.component.html',
  styleUrls: ['./update-todos.component.scss']
})
export class UpdateTodosComponent implements OnInit, OnDestroy {

  title: string = this.oS.currentTodo?.title || '';
  description: string = this.oS.currentTodo?.description || '';
  status: boolean = this.oS.currentTodo?.completed || false;
  category: number = this.oS.currentTodo?.category || 0;
  priority: number = this.oS.currentTodo?.priority || 0;
  dueDate: Date = this.oS.currentTodo?.due_date || new Date();
  assignedTo: number[] = this.oS.currentTodo?.assigned_to || [];

  newAssignments: boolean = false;


  todoForm = new FormGroup({
    category: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    completed: new FormControl(),
    priority: new FormControl(),
    due_date: new FormControl(),
    assigned_to: new FormControl(),
    subtasks: new FormControl()
  });


  constructor(
    public oS: OverlayService,
    public dataService: DataService,
    private location: Location,
    ) { }


  ngOnInit(): void {
    console.log("the current todo: ", this.oS.currentTodo);
  }


  ngOnDestroy(): void {
    console.log("destroying update component");
  }


  openCategoryForm() {
    this.category = 0;
    this.oS.categoryOverlayVisible = true;
  }


  displayColor(e: any) {
    let color = e.target.value.split(',')[1];
    e.target.style.color = color;
  }


  isSelected(id: number) {
    return this.assignedTo.includes(id);
  }


  hasNewAssignments() {
    this.newAssignments = true;
  }


  undoChangedAssignments() {
    this.newAssignments = false;
  }


  resetAssignments() {
    this.assignedTo = [];
  }


  openContactForm() {
    this.assignedTo = [];
    this.oS.contactOverlayVisible = true;
  }


  updateSubtaskTitle($event: any, sub: Subtasks) {
    this.oS.subtasks[this.oS.subtasks.indexOf(sub)].title = $event.target.value;
  }


  updateSubtaskStatus($event: any, sub: Subtasks) {
    this.oS.subtasks[this.oS.subtasks.indexOf(sub)].completed = $event.target.checked;
  }


  deleteSubtask(sub: Subtasks) {
    this.oS.subtasks.splice(this.oS.subtasks.indexOf(sub), 1);
  }


  async updateTodo() {
    let todo = this.addChanges();
    console.log("the final todo: ", todo);
    await this.dataService.updateTodoById(todo as Todo);
    this.oS.currentTodo = await this.dataService.getTodoById(this.oS.currentTodo?.id as number);
    this.oS.setSubjectTrue();
    this.close();
  }


  addChanges() {
    let todo = {
      ...this.oS.currentTodo
    };
    this.todoForm.value.title !== '' ? todo.title = this.todoForm.value.title : null;
    this.todoForm.value.description !== '' ? todo.description = this.todoForm.value.description : null;
    this.todoForm.value.completed !== this.oS.currentTodo?.completed ? todo.completed = this.todoForm.value.completed : null;
    this.todoForm.value.category !== this.oS.currentTodo?.category ? todo.category = this.todoForm.value.category : null;
    this.todoForm.value.priority !== this.oS.currentTodo?.priority ? todo.priority = this.todoForm.value.priority : null;
    this.todoForm.value.due_date !== this.oS.currentTodo?.due_date ? todo.due_date = this.todoForm.value.due_date : null;
    this.todoForm.value.assigned_to !== this.oS.currentTodo?.assigned_to ? todo.assigned_to = this.todoForm.value.assigned_to : null;
    this.todoForm.value.subtasks !== this.oS.subtasks ? todo.subtasks = this.oS.subtasks : null;
    return todo;
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }


  close() {
    this.oS.subtasks = [];
    this.location.back();
  }
}
