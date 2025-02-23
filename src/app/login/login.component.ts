import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonIcon
} from '@ionic/angular/standalone';
import { IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        CommonModule,
        RouterLink,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        IonIcon
    ]
})
export class LoginComponent implements OnInit {
    @ViewChild('passwordInput') passwordInput!: IonInput;
    showPassword = false;
    eyeOff = false;

    constructor() { }

    ngOnInit() {
    }

    onPasswordChange($event: IonInputCustomEvent<InputInputEventDetail>) {
        this.showPassword = $event.detail.value!.length > 0;
    }

    togglePassword() {
        this.eyeOff = !this.eyeOff;
        this.passwordInput.type = this.eyeOff ? 'text' : 'password';
    }
}
