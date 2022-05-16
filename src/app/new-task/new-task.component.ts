import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewTask } from '../model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  @Output() saveTaskEmitter = new EventEmitter();

  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get title(): AbstractControl | null {
    return this.newTaskForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.newTaskForm.get('description');
  }

  constructor() {}

  addNewTask() {
    if (this.newTaskForm.valid) {
      const value: NewTask = this.newTaskForm.value;
      console.log(value);
      this.saveTaskEmitter.emit(value);
      this.newTaskForm.reset();
    }
  }
}
