import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    IonContent,
    IonButton,
    IonImg,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-email-sent',
    templateUrl: './email-sent.component.html',
    styleUrls: ['./email-sent.component.scss'],
    imports: [
        CommonModule,
        IonButton,
        IonImg,
        IonContent
    ]
})
export class EmailSentComponent implements OnInit {
    email: string = "email.example.com";

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    goToLogin() {
        this.router.navigate(['/login'], { replaceUrl: true });
    }
}
