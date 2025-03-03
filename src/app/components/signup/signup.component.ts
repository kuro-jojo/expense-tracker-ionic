import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    imports: [
        CommonModule,
        RouterLink,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        IonIcon,
        IonCheckbox,
        IonInputPasswordToggle,
    ]
})
export class SignupComponent implements OnInit {
    @ViewChild('passwordInput') passwordInput!: IonInput;
    showPassword = false;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    onPasswordChange($event: IonInputCustomEvent<InputInputEventDetail>) {
        this.showPassword = $event.detail.value!.length > 0;
    }

    signUp() {
        console.log('Sign up');
        this.router.navigate(['/verification']);
    }
}
