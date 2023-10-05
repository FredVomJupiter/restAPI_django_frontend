import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Todo } from 'src/app/models/todo.model';
import { Subtask } from 'src/app/models/subtask.model';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {


  title: string = '';
  description: string = '';
  status: boolean = false;
  category: number = 1;
  priority: number = 1;
  dueDate: Date = new Date();
  assignedTo: number[] = [];


  todoForm = new FormGroup({
    category: new FormControl(this.category, Validators.required),
    title: new FormControl(this.title, Validators.required),
    description: new FormControl(this.description, Validators.required),
    completed: new FormControl(this.status),
    priority: new FormControl(this.priority, Validators.required),
    due_date: new FormControl(this.dueDate, Validators.required),
    assigned_to: new FormControl(this.assignedTo, Validators.required),
    subtasks: new FormControl(this.oS.subtasks)
  });

  constructor(
    public oS: OverlayService,
    private router: Router,
    public dataService: DataService
  ) { }


  ngOnInit(): void {
    console.log("Init add component");
    this.setDefaultData();
  }


  ngOnDestroy(): void {
    console.log("destroying add component");
  }


  setDefaultData() {
    this.oS.subtasksFull = [];
    this.oS.subtasks = [];
    this.title = '';
    this.description = '';
    this.status = false;
    this.category = 1;
    this.priority = 1;
    this.dueDate = new Date();
    this.assignedTo = [];
  }

  /**
   * Shows the form values in the console each time an input is changed.
   */
  showFormValues() {
    //console.log(this.todoForm.value);
  }


  openCategoryForm() {
    this.category = 0;
    this.oS.categoryOverlayVisible = true;
  }


  /**
   * If the form is valid, all if any subtasks are created, then the todo is created
   * via the dataService http post request to api endpoints.
   */
  async create() {
    if (this.todoForm.valid) {
      await this.createSubtasks();
      await this.dataService.createTodo(this.todoForm.value as Todo);
      this.closeForm();
    } else {
      console.log('invalid form');
    }
  }


  async createSubtasks() {
    for (let sub of this.oS.subtasksFull) {
      const subtask = await this.dataService.createSubtask(sub);
      this.oS.subtasks.push(subtask);
    }
    this.todoForm.value.subtasks = [...this.oS.subtasks];
  }


  displayColor(e: any) {
    let color = e.target.value.split(',')[1];
    e.target.style.color = color;
  }


  isSelected(id: number) {
    return this.assignedTo.includes(id);
  }


  resetAssignments() {
    this.assignedTo = [];
  }


  openContactForm() {
    this.assignedTo = [];
    this.oS.contactOverlayVisible = true;
  }

  /**
   * Removes the references of a subtask from the temporary subtasks and subtasksFull arrays.
   * @param sub as index number.
   */
  deleteSubtask(sub: Subtask) {
    this.oS.subtasksFull.splice(this.oS.subtasksFull.indexOf(sub), 1);
  }


  closeForm() {
    this.router.navigate(['/todos']);
  }


  noBubble($event: any) {
    $event.stopPropagation();
  }

}
