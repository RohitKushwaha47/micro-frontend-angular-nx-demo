import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodoService } from '@mfe/shared/todos';

@Component({
  selector: 'todos-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() data!: Todo;

  constructor(private todoService: TodoService) {}

  async updateTodo() {
    await this.todoService.updateTodo(this.data);
  }

  async deleteTodo() {
    await this.todoService.deleteTodo(this.data);
  }
}
