import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/launch-screen/launch-screen.component').then((m) => m.LaunchSreenComponent),
    },
    {
        path: 'onboarding',
        loadComponent: () => import('./components/onboarding/onboarding.component').then((m) => m.OnboardingComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component').then((m) => m.SignupComponent),
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
    },
    {
        path: 'email-sent/:email',
        loadComponent: () => import('./components/email-sent/email-sent.component').then((m) => m.EmailSentComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
    },
    {
        path: 'verification',
        loadComponent: () => import('./components/verification/verification.component').then((m) => m.VerificationComponent),
    },
    {
        path: '**',
        redirectTo: 'onboarding',
        pathMatch: 'full',
    },
];
