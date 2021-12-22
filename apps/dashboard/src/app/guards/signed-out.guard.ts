import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@mfe-demo-prototype/shared/authentication';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userId = this.authService.authUser?.uid ?? '';
    return this.authService.currentUser().pipe(
      map((user) => !!user),
      map((res) => {
        if (!res) {
          return true;
        }
        this.router.navigate(['dashboard', userId]);
        return false;
      })
    );
  }
}
