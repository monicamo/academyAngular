import { Injectable } from '@angular/core';

import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTaskData, Task } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  /**
   * Lista interna de tarefas mantida em memória.
   * Inicialmente carregada com dados mockados (DUMMY_TASKS)
   * ou sobrescrita pelo conteúdo salvo no localStorage.
   */
  private tasks: Task[] = [...DUMMY_TASKS];

  constructor() {
    this.loadTasksFromStorage();
  }

  /**
   * Retorna todas as tarefas de um usuário específico.
   * @param userId - ID do usuário dono das tarefas.
   */
  getUserTasks(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  /**
   * Adiciona uma nova tarefa para um determinado usuário.
   * @param taskData - Dados da nova tarefa (título, resumo e data).
   * @param userId - ID do usuário ao qual a tarefa pertence.
   */
  addTask(taskData: NewTaskData, userId: string) {
    const newTask: Task = {
      id: Date.now().toString(), // ID único baseado em timestamp
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
      userId,
    };

    // this.tasks.unshift(newTask);
    //Imutável (ou immutable) significa que você não altera diretamente o objeto ou array original, mas cria uma nova versão dele.
    this.tasks = [newTask, ...this.tasks];

    this.saveTasks();
  }

  /**
   * Remove uma tarefa definitivamente com base no ID.
   * @param id - ID da tarefa que deve ser removida.
   */
  removeTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  /**
   * Carrega as tarefas salvas no localStorage, caso existam.
   * Caso o JSON esteja corrompido, mantém os dados padrão.
   */
  private loadTasksFromStorage(): void {
    const saved = localStorage.getItem('tasks');

    if (saved) {
      try {
        this.tasks = JSON.parse(saved);
      } catch {
        console.warn(
          'Dados inválidos encontrados no localStorage. Usando dados padrão.'
        );
      }
    }
  }

  /**
   * Salva o estado atual das tarefas no localStorage.
   * Chamado automaticamente após qualquer alteração (add/remove).
   */
  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
