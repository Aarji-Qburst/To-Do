import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskTable } from 'src/app/core/interfaces/interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: TaskTable;
  @Output() marked = new EventEmitter();
  constructor(private toast: ToastService) { }

  ngOnInit(): void {
  }
  markAsDone(): void {
    this.task.status = 'Done'
    this.marked.emit(this.task);
    this.toast.show({ message: 'Marked as done', type: 'Success' });
  }
}
