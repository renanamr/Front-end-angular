import { Component } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-item-task',
  standalone: true,
  imports: [],
  templateUrl: './item-task.component.html',
  styleUrl: './item-task.component.css'
})
export class ItemTaskComponent {
  task = new Task({name: "Renan", isCompleted: true});

  changeStatusTask() {
    this.task.isCompleted = !this.task.isCompleted;
  }
}
