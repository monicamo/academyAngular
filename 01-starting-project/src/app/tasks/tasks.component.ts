import { Component, inject, input } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from '../models/app.models';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  name = input.required<string>();
  userId = input.required<string>();
  users = DUMMY_USERS;
  isAddingTask = false;

  private tasksService = inject(TasksService);

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId());
  }

  // onCompleteTask(taskId: string) {
  //   this.tasks = this.tasks.filter((task) => task.id !== taskId);
  // }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  // onAddTask(taskData: NewTaskData) {
  //   this.tasks.unshift({
  //     id: new Date().getTime().toString(),
  //     title: taskData.title,
  //     summary: taskData.summary,
  //     dueDate: taskData.dueDate,
  //     userId: this.userId(),
  //   });

  //   this.isAddingTask = false;
  // }
}
