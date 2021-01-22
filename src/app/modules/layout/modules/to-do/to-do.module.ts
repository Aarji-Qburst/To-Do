import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do/to-do.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateTaskComponent } from './to-do/component/update-task/update-task.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';


@NgModule({
  declarations: [ToDoComponent, UpdateTaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    ToDoRoutingModule
  ],
  entryComponents: [
    UpdateTaskComponent,
    ConfirmComponent
  ]
})
export class ToDoModule { }
