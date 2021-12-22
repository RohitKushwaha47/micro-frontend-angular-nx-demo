/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RemoteEntryModule } from './remote-entry/entry.module';
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
import {
  provideFirestore,
  getFirestore,
  Firestore,
} from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
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
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
