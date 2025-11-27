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
  /**
   * Nome do usuário selecionado (recebido do componente pai).
   * Input baseado em Signals.
   */
  name = input.required<string>();

  /**
   * ID do usuário cujas tarefas serão exibidas.
   * Input baseado em Signals.
   */
  userId = input.required<string>();

  /**
   * Lista estática de usuários (mock).
   */
  users = DUMMY_USERS;

  /**
   * Controla a exibição do formulário de nova tarefa.
   */
  isAddingTask = false;

  /**
   * Injeta o serviço responsável por gerenciar as tarefas.
   */
  private tasksService = inject(TasksService);

  /**
   * Retorna dinamicamente as tarefas do usuário selecionado.
   * Atualiza automaticamente quando userId() muda (graças ao Signal).
   */
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId());
  }

  /**
   * Abre o formulário/modal de adicionar tarefa.
   */
  onStartAddTask() {
    this.isAddingTask = true;
  }

  /**
   * Fecha o formulário/modal de adicionar tarefa.
   */
  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
