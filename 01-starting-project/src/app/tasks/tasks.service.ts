import { Injectable } from '@angular/core';

import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTaskData } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = DUMMY_TASKS;

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
      userId: userId,
    });
  }

  removeTask(id: string) {
    console.log('🚀 ~ TasksService ~ removeTask ~ id:', id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log('🚀 ~ TasksService ~ removeTask ~ this.tasks:', this.tasks);
  }
}
