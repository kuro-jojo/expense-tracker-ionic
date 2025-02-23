import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonIcon
} from '@ionic/angular/standalone';
import { InputInputEventDetail, IonInputCustomEvent } from '@ionic/core';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    imports: [
        CommonModule,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        IonIcon
    ]
})
export class ResetPasswordComponent implements OnInit {

    @ViewChild('passwordInput') passwordInput!: IonInput;
    showPassword = false;
    eyeOff = false;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    onPasswordChange($event: IonInputCustomEvent<InputInputEventDetail>) {
        this.showPassword = $event.detail.value!.length > 0;
    }

    togglePassword() {
        this.eyeOff = !this.eyeOff;
        this.passwordInput.type = this.eyeOff ? 'text' : 'password';
    }

    resetPassword() {
        this.router.navigate(['/login'], { replaceUrl: true });
    }
}
