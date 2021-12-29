import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

// Interfaces

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authUser = new BehaviorSubject<AuthUser | null>(null);

  public currentUser(): Observable<AuthUser | null> {
    return this.authUser;
  }

  public async signIn(credential: {
    email: string;
    password: string;
  }): Promise<void> {
    if (credential.email === 'admin' && credential.password === 'admin') {
      this.authUser.next({
        uid: v4(),
        email: credential.email,
        name: 'Admin',
      });
    }
  }

  public async signUp(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<void> {
    this.authUser.next({
      uid: v4(),
      email: userData.email,
      name: userData.name,
    });
  }

  public async signOut(): Promise<void> {
    this.authUser.next(null);
  }
}
