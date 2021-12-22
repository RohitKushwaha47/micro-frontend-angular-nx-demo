import { Component, OnInit } from '@angular/core';
import { AuthService } from '@mfe-demo-prototype/shared/authentication';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mfe-demo-prototype-root',
  template: `
    <div class="min-h-screen bg-gray-300">
      <div class="flex items-center justify-between p-2">
        <h1 class="text-2xl font-bold">
          {{ (user | async)?.displayName }} Dashboard
        </h1>
        <div class="flex items-center justify-end space-x-5">
          <div
            *ngIf="user | async"
            class="flex items-center justify-between space-x-5"
          >
            <a [routerLink]="['dashboard', userId]">Dashboard</a>
            <button (click)="signOut()">Logout</button>
          </div>
          <div
            *ngIf="(user | async) === null"
            class="flex items-center justify-between space-x-5"
          >
            <a routerLink="/auth/login">Login</a>
            <a routerLink="/auth/signup">Signup</a>
          </div>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  public user!: Observable<User | null>;
  public userId!: string;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.currentUser();

  }

  ngOnInit(): void {
    this.user.subscribe((data) => {
      if (data === null) {
        this.router.navigate(['auth', 'login']);
      } else {
        this.userId = data.uid;
        this.router.navigate(['dashboard', this.userId]);
      }
    });
  }

  async signOut() {
    await this.authService.signOut();
    await this.router.navigateByUrl('/auth/login');
  }
}
