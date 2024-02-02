import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.isUserLoggedIn(); // Implement this method based on your auth logic

    if (!isLoggedIn) {
      this.router.navigate(['/login']);  // Redirect to login page
      return false;
    }
    return true;
  }

  isUserLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in or not.
    // For instance, you could check a service or local storage.
    return !!localStorage.getItem('token'); // Just an example. Do not use directly in production.
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
