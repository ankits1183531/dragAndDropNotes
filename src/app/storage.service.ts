import { Injectable } from '@angular/core';
import { tasks, states } from './data';
import { DataSource, State, Task } from './model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  draggedElement: any;

  constructor() {}

  checkApplicationState(): boolean {
    if (sessionStorage.getItem('states') && sessionStorage.getItem('tasks')) {
      return true;
    } else {
      return false;
    }
  }

  setInitialTaskAndStates() {
    if (!this.checkApplicationState()) {
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
      sessionStorage.setItem('states', JSON.stringify(states));
    }
  }

  getStatesList(): State[] {
    const states: State[] = JSON.parse(
      sessionStorage.getItem('states') || '[]'
    );
    return states;
  }

  getTaskList(): Task[] {
    const tasks: Task[] = JSON.parse(sessionStorage.getItem('tasks') || '[]');
    return tasks;
  }

  getTaskForState(state: State): Task[] {
    const tasks = this.getTaskList().filter(
      (task: Task) => task.type === state.type
    );
    return tasks;
  }

  updateTaskList(task: Task): void {
    const taskList = [...this.getTaskList(), task];
    sessionStorage.setItem('tasks', JSON.stringify(taskList));
  }

  removeTaskFromDataSource(taskid: number) {
    const taskList = this.getTaskList().filter((el: Task) => el.id != taskid);
    sessionStorage.setItem('tasks', JSON.stringify(taskList));
  }

  updateStatesList(state: State): void {
    const states = [...this.getStatesList(), state];
    sessionStorage.setItem('states', JSON.stringify(states));
  }

  removeStateFromDataSource(stateId: number) {
    const states = this.getStatesList().filter((el: State) => el.id != stateId);
    sessionStorage.setItem('states', JSON.stringify(states));
  }

  updateTaskType(taskId: string, type: string, dropIndex: string) {
    let restElementList: Task[] = [];
    let groupedListOnElementDropped: any = [];
    this.getTaskList().forEach((el, index) => {
      if (el.type === type) {
        groupedListOnElementDropped.push(el);
      } else {
        restElementList.push(el);
      }
    });
    restElementList.forEach((el, index) => {
      if (el.id === Number(taskId)) {
        restElementList.splice(index, 1);
      }
    });
    this.draggedElement.type = type;
    groupedListOnElementDropped.splice(dropIndex, 0, this.draggedElement);

    const updatedTaskList = [
      ...groupedListOnElementDropped,
      ...restElementList,
    ];
    sessionStorage.setItem('tasks', JSON.stringify(updatedTaskList));
  }
}
