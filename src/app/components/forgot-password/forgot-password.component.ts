import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton
} from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        ToastComponent,
    ]
})
export class ForgotPasswordComponent implements OnInit {
    email = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)]);

    toastMessage = '';
    isFailed = false;
    isSubmitting = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() { }

    resetPassword() {
        if (this.email.valid) {
            this.isSubmitting = true;
            this.authService.forgotPassword(this.email.value!).subscribe({
                next: (response) => {
                    this.router.navigate(['/email-sent', this.email.value]);
                },
                error: (err) => {
                    this.isFailed = true;
                    if (err?.status === 0) {
                        this.toastMessage = "Network error. Please try again";
                    } else {
                        this.toastMessage = err.error.message;
                    }
                    console.log("Failed to reset password", err);
                }
            })
        }

        this.isSubmitting = false;
        this.toastMessage = '';
    }
}
