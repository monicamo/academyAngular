import { Component, inject, input, output } from '@angular/core';
import { Task } from '../../models/app.models';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  /**
   * Tarefa individual recebida do componente pai.
   * Utiliza Signals, por isso é lida via this.task().
   */
  task = input.required<Task>();

  /**
   * Serviço responsável por gerenciar e modificar as tarefas.
   */
  private tasksService = inject(TasksService);

  /**
   * Marca a tarefa como concluída, removendo-a da lista.
   * Aciona o método correspondente no TasksService.
   */
  onCompleteTask() {
    this.tasksService.removeTask(this.task().id);
  }
}
