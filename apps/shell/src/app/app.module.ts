import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MicroFrontendNavComponent } from './micro-frontend-nav/micro-frontend-nav.component';
import { createMicroFrontendRoutes } from 'ng-module-federation';
import { microFrontends } from '../micro-frontends';
import { SignedOutGuard } from './guards/signed-out.guard';
import { SignedInGuard } from './guards/signed-in.guard';

const routes: Routes = [
  ...createMicroFrontendRoutes(microFrontends).map((route) => {
    if (route.path?.split('/').includes('auth')) {
      return { ...route, canActivate: [SignedOutGuard] };
    }

    if (route.path?.split('/').includes('todos')) {
      return { ...route, canActivate: [SignedInGuard] };
    }

    return route;
  }),
];

@NgModule({
  declarations: [AppComponent, MicroFrontendNavComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
