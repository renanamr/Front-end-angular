import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-item-task',
  standalone: true,
  imports: [],
  templateUrl: './item-task.component.html',
  styleUrl: './item-task.component.css'
})
export class ItemTaskComponent {
  @Input({required: true}) task! : Task;

  changeStatusTask() {
    this.task.isCompleted = !this.task.isCompleted;
  }
}