import { Component } from '@angular/core';

@Component({
  selector: 'mfe-demo-prototype-root',
  template: `
    <div class="min-h-screen bg-gray-300">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'dashboard';
}
