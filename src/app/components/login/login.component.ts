import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    isLogginSuccess = false;
    isLogginFailed = false;
    isSubmitting = false;
    toastMessage = '';

    constructor(
        private authService: AuthenticationService,
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
                        this.isLogginSuccess = true;
                        this.toastMessage = "Login successful";
                        // TODO navigate to home page
                    },
                    error: (error) => {
                        console.log("Authentication error : ", error?.error?.detail);
                        this.isLogginFailed = true;
                        this.toastMessage = "Invalid email or password";
                    }
                });
        }

        this.isSubmitting = false;
        this.isLogginFailed = false;
        this.isLogginSuccess = false;
        this.toastMessage = '';
    }
}
