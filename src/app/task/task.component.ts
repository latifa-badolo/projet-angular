import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8">
      <div>
        <h2 class="font-semibold text-xl mb-2">Liste de tache</h2>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let task of tasks">
              <td>
                {{ task.id }}
              </td>
              <td>
                {{ task.name }}
              </td>
              <td>
                {{ task.description }}
              </td>
              <td>
                <span>
                  {{ task.status ? 'TERMINER' : 'EN COURS' }}
                </span>
              </td>

              <td>
                <button
                  (click)="toggleTask(task.id)"
                  [disabled]="task.status"
                  class="btn btn-primary btn-sm"
                >
                  {{ 'Marquer comme terminée' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Ajouter une nouvelle tâche</h3>

        <form
          (submit)="addTask()"
          class="d-flex justify-content-around"
          style="width: 600px;"
        >
          <input
            type="text"
            placeholder="Nom de la tâche"
            [(ngModel)]="newTaskName"
            [ngModelOptions]="{ standalone: true }"
            required
            style="width: 250px;"
            class="form-control w-4"
          />
          <input
            type="text"
            placeholder="Description de la tâche"
            [(ngModel)]="newTaskDescription"
            [ngModelOptions]="{ standalone: true }"
            required
            style="width: 250px;"
            class="form-control"
          />
          <button type="submit" (click)="addTask()" class="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  `,
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskName.trim() && this.newTaskDescription.trim()) {
      this.taskService.addTask(
        this.newTaskName.trim(),
        this.newTaskDescription.trim()
      );
      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }

  toggleTask(id: number) {
    this.taskService.toggleTaskStatus(id);
  }
}
