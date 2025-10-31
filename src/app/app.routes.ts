import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
            { path: 'register', loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) }
        ]
    },
    {
        path: '',
        children: [
            { path: 'posts', loadComponent: () => import('./pages/posts/posts').then(m => m.Posts) },
            { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile) }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
