import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

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
        component: MainLayout,
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
