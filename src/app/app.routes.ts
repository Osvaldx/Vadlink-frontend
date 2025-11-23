import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { homeGuard } from './guards/home-guard';
import { adminGuard } from './guards/admin-guard';

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
            {
                path: '',
                canActivate: [homeGuard],
                children: [
                    { path: 'posts', loadComponent: () => import('./pages/posts/posts').then(m => m.Posts) },
                    { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile) }
                ]
            },
            {
                path: 'dashboard',
                canActivate: [adminGuard],
                children: [
                    { path: 'users', loadComponent: () => import('./pages/dashboard/users/users').then(m => m.Users) },
                    { path: 'stats', loadComponent: () => import('./pages/dashboard/stats/stats').then(m => m.Stats) }
                ]
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
