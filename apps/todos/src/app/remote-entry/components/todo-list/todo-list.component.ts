import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@mfe-demo-prototype/shared/authentication';
import { Todo, UserTodoService } from '@mfe-demo-prototype/shared/todo';
import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'mfe-demo-prototype-todo-list',
  template: `
    <div class="h-full flex-col items-center justify-center ">
      <mfe-demo-prototype-todo-form></mfe-demo-prototype-todo-form>
      <h1 class="text-center text-2xl font-bold mt-5 mb-2">Todos</h1>

      <div
        class="flex flex-col items-center justify-start space-y-5 h-96 flex-grow"
      >
        <mfe-demo-prototype-todo-list-item
          *ngFor="let todo of todos$ | async"
          [data]="todo"
        ></mfe-demo-prototype-todo-list-item>
      </div>
    </div>
  `,
  styles: [],
})
export class TodoListComponent implements OnInit {
  public todos$!: Observable<Todo[]>;
  public user$!: Observable<User | null>;

  private userUid!: string;

  constructor(
    private todoService: UserTodoService,
    private activaedRoute: ActivatedRoute
  ) {
    this.activaedRoute.params.subscribe((data) => {
      console.log(data['userUid']);
      this.userUid = data['userUid'];
      this.todoService.setUserId(this.userUid);
    });
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }
}
