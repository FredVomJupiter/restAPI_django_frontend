import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subtask } from 'src/app/models/subtask.model';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss']
})
export class AddSubtaskComponent {

  @Output() newSubtask: Subtask = {
    title: '',
    completed: false
  };

  subtaskForm = new FormGroup({
    subtasks: new FormControl(this.newSubtask.title, Validators.required),
    completion: new FormControl(this.newSubtask.completed)
  });

  constructor(
    public oS: OverlayService
  ) { }


  addSubtask() {
    console.log(this.newSubtask);
    this.oS.subtasks.push(this.newSubtask);
    this.newSubtask = {
      title: '',
      completed: false
    };
  }

}
