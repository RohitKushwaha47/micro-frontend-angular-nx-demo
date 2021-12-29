import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '@mfe/shared/auth';
import { TodoService } from '@mfe/shared/todos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-micro-frontend-nav',
  templateUrl: './micro-frontend-nav.component.html',
  styleUrls: ['./micro-frontend-nav.component.scss'],
})
export class MicroFrontendNavComponent implements OnInit {
  public user!: Observable<AuthUser | null>;
  public userId!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private todoService: TodoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.currentUser();
    this.user.subscribe((data) => {
      if (data === null) {
        this.router.navigate(['auth', 'login']);
        // this.router.navigate(['shared']);
      } else {
        this.userId = data.uid;
        this.router.navigate(['todos', this.userId]);
      }
    });
  }

  async signOut() {
    await this.authService.signOut();
    await this.todoService.clearTodos();
    await this.router.navigateByUrl('/auth/login');
  }
}
