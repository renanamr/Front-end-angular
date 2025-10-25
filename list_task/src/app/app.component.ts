import { Component } from '@angular/core';
import { ItemTaskComponent } from './item-task/item-task.component';
import { Task } from '../models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  taskList : Array<Task> = [
    new Task({ name: 'Estudar Angular', isCompleted: false }),
    new Task({ name: 'Praticar TypeScript', isCompleted: true }),
    new Task({ name: 'Ler sobre Web Development', isCompleted: false })
  ];

  tasksCompleted: number = 1;

  changeCompleteTask(task: Task) {
    if(task.isCompleted){
      this.tasksCompleted ++;
    }else{
      this.tasksCompleted --;
    }
  }
}