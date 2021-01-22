import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmData, TaskTable } from 'src/app/core/interfaces/interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from './component/update-task/update-task.component';
import { StoreService } from 'src/app/core/services/store/store.service';
import { config } from 'src/app/config/config';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  displayedColumns: string[] = ['select', 'date', 'title', 'description', 'status', 'action'];
  dataSource = new MatTableDataSource<TaskTable>([]);
  selection = new SelectionModel<TaskTable>(true, []);
  minDate = new Date();
  constructor(
    private dialog: MatDialog,
    private store: StoreService,
    private toast:ToastService) { }
  ngOnInit(): void {
    this.getList();
  }
  //#region Display Table Data
  getList(): void {
    const data = this.store.getStorageValue(config.storeKey) ?? [];
    this.dataSource = new MatTableDataSource<TaskTable>(data);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  //#endregion  

  //#region Delete task
  deleteTask(task: TaskTable): void {
    const deleteTask = () => {
      const store = this.store.getStorageValue(config.storeKey);
      const index = store.findIndex((f: TaskTable) => f.id === task.id);
      store.splice(index, 1);
      this.getList();
    };
    const data: ConfirmData = {
      mainTitle: 'Delete task?',
      content: 'Are you sure you want to delete?',
      buttonLabel: 'Delete'
    }
    let dialogRef = this.dialog.open(ConfirmComponent, { data, minWidth: '30em' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        deleteTask()
        this.toast.show({message:'Deleted successfully',type:'Success'});
      }
    });
  }
  deleteAll():void{
    const deleteAll = () => {
      this.store.addToStorage(config.storeKey,[]);
      this.getList();
      this.selection.clear();
    }
    const data: ConfirmData = {
      mainTitle: 'Delete task?',
      content: 'Are you sure you want to delete?',
      buttonLabel: 'Delete'
    }
    let dialogRef = this.dialog.open(ConfirmComponent, { data, minWidth: '30em' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {   
        deleteAll();
        this.toast.show({message:'Deleted successfully',type:'Success'});
      }
    });
  }
  //#endregion

  //#region Mark as Done
  markAsDone(task: TaskTable): void {
    task.status = 'Done';
    this.toast.show({message:'Marked as done',type:'Success'});
  }
  markAllAsDone():void{
    this.selection.selected.map(x => x.status = 'Done');
    this.selection.clear();   
    this.toast.show({message:'Marked as done',type:'Success'}); 
  }
  //#endregion

  //#region Add/Update Task
  updateTask(data?: TaskTable): void {
    let dialogRef = this.dialog.open(UpdateTaskComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getList();
      }
    });
  }
  //#endregion 
}
