import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { authUser } from '@mfe-demo-prototype/shared/authentication';
import { map, Observable } from 'rxjs';

// Interfaces
export interface Todo {
  id: string;
  body: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserTodoService {
  private currentUserId: string | undefined;

  public currentUser!: authUser;

  constructor(private firestore: Firestore) {
    this.firestore = getFirestore();
  }

  public todos$!: Observable<Todo[]>;

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
    console.log('CURRENT USER ID ', this.currentUserId);

    const coll = collection(
      this.firestore,
      `todo_users/${this.currentUserId}/todos`
    );

    this.todos$ = collectionData(coll, { idField: 'id' }).pipe(
      map((data) => {
        return data.map((doc) => {
          const todo: Todo = {
            body: doc['body'],
            done: doc['done'],
            id: doc['id'],
          };
          return todo;
        });
      })
    );

    this.todos$.subscribe(console.log);
    return this.todos$;
  }

  // Create Todo

  public async createTodo(body: string): Promise<void> {
    try {
      const coll = collection(
        this.firestore,
        `todo_users/${this.currentUserId}/todos`
      );
      await addDoc(coll, {
        body,
        done: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
  // update Todo
  public async updateTodo(todo: Todo): Promise<void> {
    const docRef = doc(
      this.firestore,
      `todo_users/${this.currentUserId}/todos/${todo.id}`
    );

    await updateDoc(docRef, {
      done: !todo.done,
    });
  }

  // delete Todo
  public async deleteTodo(todo: Todo): Promise<void> {
    const docRef = doc(
      this.firestore,
      `todo_users/${this.currentUserId}/todos/${todo.id}`
    );

    await deleteDoc(docRef);
  }
}
