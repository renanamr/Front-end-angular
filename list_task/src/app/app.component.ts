import { Component } from '@angular/core';
import { ItemTaskComponent } from './item-task/item-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}