import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from '@mfe/shared/todos';
import { Observable } from 'rxjs';

@Component({
  selector: 'todos-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos$!: Observable<Todo[]>;

  private userUid!: string;

  constructor(
    private todoService: TodoService,
    private activaedRoute: ActivatedRoute
  ) {
    this.activaedRoute.params.subscribe((data) => {
      this.userUid = data['userUid'];
      this.todoService.setUserId(this.userUid);
    });
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }
}
