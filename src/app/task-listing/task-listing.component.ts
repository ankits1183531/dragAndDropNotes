import { Component, Input, OnChanges } from '@angular/core';
import { NewTask, State, Task } from '../model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.scss'],
})
export class TaskListingComponent implements OnChanges {
  @Input() state?: State;
  taskListDataSource: Task[] = [];

  constructor(private storageService: StorageService) {}

  ngOnChanges(): void {
    if (this.state) {
      console.log(this.state);
      this.taskListDataSource = this.storageService.getTaskForState(this.state);
    }
  }

  saveNewTask(event: NewTask) {
    const task: Task = {
      id: new Date().getTime(),
      title: event.title,
      description: event.description,
      type: this.state!.type,
    };
    this.storageService.updateTaskList(task);
    this.taskListDataSource = [...this.taskListDataSource, task];
  }

  onGroupClick(event: any) {
    if (event.target.id && event.target.id.includes('close-')) {
      const id = event.target.id.split('-');
      this.storageService.removeTaskFromDataSource(Number(id[1]));
      if (this.state)
        this.taskListDataSource = this.storageService.getTaskForState(
          this.state
        );
      console.log(id[1]);
    }
  }

  dragStartEvent(event: any) {
    this.storageService.draggedElement = this.storageService
      .getTaskList()
      .filter((el) => el.id === Number(event.target.id.split('-')[1]))[0];
    event.dataTransfer.setData('text', event.target.id);
  }

  dropEvent(event: any) {
    event.preventDefault();
    const draggedElementDataId = event.dataTransfer
      .getData('text')
      .split('-')[1];
    const articleElement = event.target.closest('article');
    const sectionElement = event.target.closest('section');
    console.log(articleElement?.getAttribute('data-index') || 0);

    if (sectionElement.id === this.storageService.draggedElement.type) {
      alert("Can't use drag and drop in same section");
      return;
    }

    this.storageService.updateTaskType(
      draggedElementDataId,
      sectionElement.id,
      articleElement?.getAttribute('data-index') || '0'
    );
    const data = event.dataTransfer.getData('text');
    sectionElement.insertBefore(document.getElementById(data), articleElement);
  }

  dragover(ev: any) {
    ev.preventDefault();
  }
}
