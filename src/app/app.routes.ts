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
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then((m) => m.SignupComponent),
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
    },
    {
        path: 'email-sent',
        loadComponent: () => import('./email-sent/email-sent.component').then((m) => m.EmailSentComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
    },
    {
        path: 'verification',
        loadComponent: () => import('./verification/verification.component').then((m) => m.VerificationComponent),
    },
    {
        path: '**',
        redirectTo: 'onboarding',
        pathMatch: 'full',
    },
];
