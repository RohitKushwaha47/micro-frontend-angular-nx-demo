import { Injectable } from '@angular/core';
import { AuthUser } from '@mfe/shared/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

// Interfaces
export interface Todo {
  id: string;
  body: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private currentUserId: string | undefined;

  public currentUser!: AuthUser;

  private todos: Todo[] = [];

  public todos$ = new BehaviorSubject<Todo[]>([]);
  // Set current User
  public setCurrentUser(data: { uid: string; name: string; email: string }) {
    this.currentUser = data;
  }

  // set User ID
  public setUserId(userUid: string) {
    this.currentUserId = userUid;
  }

  // get Todos
  public getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  // Create Todo
  public async createTodo(body: string): Promise<void> {
    const newTodo: Todo = {
      id: v4(),
      body,
      done: false,
    };
    this.todos.push(newTodo);
    this.todos$.next(this.todos);
  }
  // update Todo
  public async updateTodo(todo: Todo): Promise<void> {
    this.todos = this.todos.map((t) => {
      if (t.id === todo.id) {
        const updatedTodo: Todo = {
          ...t,
          done: !todo.done,
        };
        return updatedTodo;
      }
      return t;
    });
    this.todos$.next(this.todos);
  }

  // delete Todo
  public async deleteTodo(todo: Todo): Promise<void> {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.todos$.next(this.todos);
  }

  // Clear All Todos When Logged Out
  public async clearTodos(): Promise<void> {
    this.todos = [];
    this.todos$.next(this.todos);
  }
}
