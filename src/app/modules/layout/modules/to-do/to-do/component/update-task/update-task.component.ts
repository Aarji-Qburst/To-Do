import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from 'src/app/config/config';
import { TaskTable } from 'src/app/core/interfaces/interface';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  frmTask!: FormGroup;
  minDate = new Date();
  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: TaskTable,
    private dialogRef: MatDialogRef<any>,
    private toast: ToastService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.patchForm();
  }
  initForm(): void {
    this.frmTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [this.minDate, Validators.required],
      status: ['To Do']
    });
  }
  patchForm(): void {
    if (this.data) {
      this.frmTask.patchValue(this.data);
    }
  }
  updateTask(): void {
    if (!!this.data) {
      this.editTask();
    } else {
      this.addNewTask();
    }
  }
  editTask(): void {
    const store = this.store.getStorageValue(config.storeKey);
    if (store) {
      const index = store.findIndex((f: TaskTable) => f.id === this.data.id);
      if (index !== -1) {
        store[index] = {
          ...store[index],
          ...this.frmTask.value,
          status: 'To Do'
        };
      }
      this.toast.show({ message: 'Task updated', type: 'Success' });
    }
    
    this.dialogRef.close(true);
  }
  addNewTask(): void {
    const store = this.store.getStorageValue(config.storeKey);
    const data = {
      ...this.frmTask.value,
      id: store ? store.length : 0
    };
    if (!store) {
      this.store.addToStorage(config.storeKey, [data]);
    } else {
      store.push(data)
      this.store.addToStorage(config.storeKey, store);
    }
    this.toast.show({ message: 'Task added', type: 'Success' });    
    this.dialogRef.close(true);
  }
}
