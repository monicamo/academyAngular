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
  /**
   * ID do usuário para o qual a nova tarefa será criada.
   * Fornecido pelo componente pai via Signal.
   */
  userId = input.required<string>();

  /**
   * Evento emitido quando o formulário deve ser fechado (cancelar ou salvar).
   */
  close = output<void>();

  /**
   * Signals que armazenam temporariamente os dados digitados no formulário.
   * Mantêm o estado local deste componente.
   */
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  /**
   * Serviço responsável por adicionar tarefas ao armazenamento.
   */
  private tasksService = inject(TasksService);

  /**
   * Manipula o envio do formulário.
   * Constrói o objeto NewTaskData baseado nos Signals locais e
   * chama o service para adicionar a nova tarefa.
   * Em seguida, notifica o componente pai para fechar o formulário.
   */
  onSubmit(): void {
    const newTask: NewTaskData = {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDueDate(),
    };

    this.tasksService.addTask(newTask, this.userId());
    this.close.emit();
  }

  /**
   * Cancela o processo de criação e informa o componente pai para fechar o formulário.
   */
  onCancel(): void {
    this.close.emit();
  }
}
