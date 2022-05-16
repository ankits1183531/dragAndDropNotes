import { Component, OnInit } from '@angular/core';
import { DataSource, State } from './model';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Navi Assignment';
  statesListDataSource: State[] = [];
  addNewStateField = '';

  constructor(private storageService: StorageService) {
    storageService.setInitialTaskAndStates();
  }

  ngOnInit() {
    this.statesListDataSource = this.storageService.getStatesList();
  }

  onGroupHeadClick(event: any) {
    if (event.target.id && event.target.id.includes('state-')) {
      const id = event.target.id.split('-');
      this.storageService.removeStateFromDataSource(Number(id[1]));
      this.statesListDataSource = this.storageService.getStatesList();
    }
  }

  onAddClickHandler() {
    const payload: State = {
      id: new Date().getTime(),
      title: this.addNewStateField,
      type: this.addNewStateField,
    };
    this.storageService.updateStatesList(payload);
    this.statesListDataSource.push(payload);
    this.addNewStateField = '';
  }

  drop(ev: any) {
    ev.preventDefault();
    console.log(ev);
    const data = ev.dataTransfer.getData('text');
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }
}
