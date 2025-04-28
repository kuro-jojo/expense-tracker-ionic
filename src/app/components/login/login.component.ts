import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonIcon,
    IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';
import { AuthResponse } from 'src/app/_models/auth';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        IonIcon,
        IonInputPasswordToggle,
        ToastComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
    showPassword = false;

    email = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)]);

    password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    isLoginSuccessful = false;
    isLoginFailed = false;
    isSubmitting = false;
    toastMessage = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) { }

    ngOnInit() {
    }

    onPasswordChange($event: IonInputCustomEvent<InputInputEventDetail>) {
        this.showPassword = $event.detail.value!.length > 0;
    }

    login() {
        this.isSubmitting = true;
        if (this.email.valid && this.password.valid) {
            this.authService.login({
                email: this.email.value!,
                password: this.password.value!
            })
                .subscribe({
                    next: (response: AuthResponse) => {
                        this.authService.saveToken(response.token);
                        this.isLoginSuccessful = true;
                        this.toastMessage = "Login successful";
                        // TODO navigate to home page
                    },
                    error: (error) => {
                        console.log("Authentication error : ", error);
                        if (error?.error?.detail === "Email not verified") {
                            this.toastMessage = "Email not verified yet!";
                            this.isLoginSuccessful = true;
                            // TODO navigate to email verification page
                            setTimeout(() => {
                                this.authService.saveSessionID(error?.error?.sessionID);
                                this.router.navigate(['/verification']);
                            }, 1000);
                        } else if (error?.status === 0) {
                            this.toastMessage = "Network error. Please try again";
                            this.isLoginFailed = true;
                        } else {
                            this.toastMessage = "Invalid email or password";
                            this.isLoginFailed = true;
                        }
                    }
                });
        }

        this.isSubmitting = false;
        this.isLoginFailed = false;
        this.isLoginSuccessful = false;
        this.toastMessage = '';
    }
}
