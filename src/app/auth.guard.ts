import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

export function authGuard(route: ActivatedRouteSnapshot): boolean {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId = route.paramMap.get('id');
  if (userId && userService.getUserById(userId)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
