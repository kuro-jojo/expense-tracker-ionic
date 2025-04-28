import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    email: string | null = "email.example.com";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.email = this.route.snapshot.paramMap.get('email');
     }

    goToLogin() {
        this.router.navigate(['/login'], { replaceUrl: true });
    }
}
