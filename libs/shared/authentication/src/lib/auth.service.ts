import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import {
  getAuth,
  Auth,
  signOut,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { User, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';

// Interfaces

export interface authUser {
  uid: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authUser!: User | null;

  constructor(
    private app: FirebaseApp,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.app = getApp();
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.authUser = this.auth.currentUser;
  }

  public currentUser(): Observable<User | null> {
    return user(this.auth);
  }

  public async getUser(): Promise<User | null> {
    return this.auth.currentUser;
  }

  public async signIn(credential: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const user: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );

      if (user.user == null) {
        return;
      }
      this.authUser = user.user;
    } catch (error) {
      return;
    }
  }

  public async signUp(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<void> {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    if (user == null) {
      return;
    }

    this.authUser = user.user;

    await updateProfile(user.user, {
      displayName: userData.name,
    });

    const docRef = doc(this.firestore, `todo_users/${user.user.uid}`);

    await setDoc(docRef, {
      name: user.user.displayName,
      email: user.user.email,
    });
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.authUser = null;
    } catch (error) {
      return;
    }
  }
}
