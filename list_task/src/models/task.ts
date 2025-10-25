export class Task {
    name: string;
    isCompleted: boolean;
  
    constructor(task : ITask) {
      this.name = task.name;
      this.isCompleted = task.isCompleted;
    }
}

interface ITask{
    name: string;
    isCompleted: boolean;
}