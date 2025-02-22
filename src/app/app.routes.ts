import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./launch-screen/launch-screen.component').then((m) => m.LaunchSreenComponent),
    },
    {
        path: 'onboarding',
        loadComponent: () => import('./onboarding/onboarding.component').then((m) => m.OnboardingComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
