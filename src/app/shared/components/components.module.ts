import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { TaskCardComponent } from './task-card/task-card.component';



@NgModule({
  declarations: [ConfirmComponent, TaskCardComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [FormsModule, ReactiveFormsModule, ConfirmComponent,TaskCardComponent]
})
export class ComponentsModule { }
