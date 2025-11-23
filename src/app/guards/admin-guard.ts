import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router)

  const isAdmin = authService.currentUser()?.rol === 'admin';

  return (isAdmin ? true : router.createUrlTree(['/posts']));
};
