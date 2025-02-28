import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
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
        IonCheckbox,
        IonInputPasswordToggle,
        ToastComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupComponent implements OnInit {
    @ViewChild('passwordInput') passwordInput!: IonInput;
    name = new FormControl('', [Validators.required]);
    email = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)]);
    password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]);
    terms = new FormControl(false, [Validators.requiredTrue]);

    showPassword = false;
    isSubmitting = false;

    isSignUpSuccessful = false;
    isSignUpFailed = false;
    toastMessage = '';

    passwordCriteria = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    };

    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() { }

    onPasswordChange($event: IonInputCustomEvent<InputInputEventDetail>) {
        const value = $event.detail.value!;
        this.showPassword = value.length > 0;
        this.passwordCriteria.length = value.length >= 8;
        this.passwordCriteria.uppercase = /[A-Z]/.test(value);
        this.passwordCriteria.lowercase = /[a-z]/.test(value);
        this.passwordCriteria.number = /[0-9]/.test(value);
        this.passwordCriteria.specialChar = /[#?!@$%^&*-]/.test(value);
    }

    signUp() {
        this.isSubmitting = true;
        if (this.name.valid && this.email.valid && this.password.valid) {
            this.authService.register({
                name: this.name.value!,
                email: this.email.value!,
                password: this.password.value!
            }).subscribe({
                next: (res) => {
                    console.log("Sign up success", res);
                    setTimeout(() => {
                        this.authService.saveSessionID(res?.sessionID);
                        this.router.navigate(['/verification']);
                    }, 1000);
                    this.isSignUpSuccessful = true;
                    this.toastMessage = "Sign up successful";
                },
                error: (err) => {
                    this.isSignUpFailed = true;
                    if (err?.error?.status === 409) {
                        console.error("Email already exists", err?.error);
                        this.toastMessage = "Email already exists";
                    } else if (err?.error?.status === 400) {
                        console.error("Invalid request", err?.error);
                        this.toastMessage = err?.error?.message;
                    } else {
                        this.toastMessage = "Sign up failed";
                        console.error("Sign up failed", err?.error);
                    }
                }
            });
        }

        this.isSubmitting = false;
        this.isSignUpFailed = false;
        this.isSignUpSuccessful = false;
        this.toastMessage = '';

        console.log('Sign up');
    }
}