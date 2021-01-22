import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/config/config';
import { TaskTable } from 'src/app/core/interfaces/interface';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toDoList:TaskTable[] = [];
  doneList:TaskTable[] = [];
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList(): void {
    const taskList = this.store.getStorageValue(config.storeKey) ?? [];
    const sortTask = (a:TaskTable,b:TaskTable) => {
      return Date.parse(a.date.toISOString()) - Date.parse(b.date.toISOString());
    }
    const filterTask = (key:string) => {
      return taskList
      .filter((f:TaskTable) => f.status === key)
      .sort(sortTask);
    }
    this.toDoList = filterTask('To Do');
    this.doneList = filterTask('Done');
  }
}
