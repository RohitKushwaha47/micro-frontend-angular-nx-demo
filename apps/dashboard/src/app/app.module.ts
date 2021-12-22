import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {
  getApp,
  getApps,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SignedInGuard } from './guards/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out.guard';
import { AuthService } from '@mfe-demo-prototype/shared/authentication';
import { UserTodoService } from '@mfe-demo-prototype/shared/todo';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('auth/Module').then((m) => m.RemoteEntryModule),
    canActivate: [SignedOutGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('todos/Module').then((m) => m.RemoteEntryModule),
    canActivate: [SignedInGuard],
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    provideFirebaseApp(() =>
      getApps().length === 0 ? initializeApp(environment.firebase) : getApp()
    ),
    provideAuth(() => getAuth(getApp())),
    provideFirestore(() => getFirestore(getApp())),
  ],
  providers: [SignedInGuard, SignedOutGuard, AuthService, UserTodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
