import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { UserTodoService } from '..';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from '@mfe-demo-prototype/shared/authentication';

const firebase = {
  projectId: 'alex-productions-a62af',
  appId: '1:395720297056:web:445df41741c3595ea29105',
  storageBucket: 'alex-productions-a62af.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyDVijckBQ5g6rXfAZ_ee4MAYL0gqsBm-js',
  authDomain: 'alex-productions-a62af.firebaseapp.com',
  messagingSenderId: '395720297056',
  measurementId: 'G-H5NNZCXBNY',
};

@NgModule({
  imports: [CommonModule],
  providers:[]
})
export class SharedTodoModule {}
