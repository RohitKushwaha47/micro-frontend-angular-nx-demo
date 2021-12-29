import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '@mfe/shared/auth';
import { TodoService } from '@mfe/shared/todos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user!: Observable<AuthUser | null>;
  public userId!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.currentUser();
    this.user.subscribe((data) => {
      console.log('DATA',  data);
      
      if (data === null) {
        this.router.navigate(['auth', 'login']);
        // this.router.navigate(['shared']);
      } else {
        this.userId = data.uid;
        this.router.navigate(['todos', this.userId]);
      }
    });
  }
}
