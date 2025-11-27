import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../../models/app.models';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  close = output<void>();
  // add = output<NewTaskData>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  private tasksService = inject(TasksService);

  onSubmit() {
    const newTask: NewTaskData = {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDueDate(),
    };

    this.tasksService.addTask(newTask, this.userId());

    // this.add.emit(newTask);

    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
