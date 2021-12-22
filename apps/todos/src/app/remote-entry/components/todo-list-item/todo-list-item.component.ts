import { Component, Input, OnInit } from '@angular/core';
import { Todo, UserTodoService } from '@mfe-demo-prototype/shared/todo';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'mfe-demo-prototype-todo-list-item',
  template: `
    <div
      class="p-2 rounded-lg shadow-md bg-gray-100 w-96 flex items-center justify-between"
    >
      <div
        class="flex items-center justify-start space-x-5"
        (click)="updateTodo()"
      >
        <div>
          <!-- icon -->
          <svg
            *ngIf="!data.done"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-amber-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            *ngIf="data.done"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          {{ data.body }}
        </div>
      </div>
      <button (click)="deleteTodo()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [],
})
export class TodoListItemComponent {
  @Input() data!: Todo;

  constructor(private todoService: UserTodoService) {}

  async updateTodo() {
    await this.todoService.updateTodo(this.data);
  }

  async deleteTodo() {
    await this.todoService.deleteTodo(this.data);
  }
}
