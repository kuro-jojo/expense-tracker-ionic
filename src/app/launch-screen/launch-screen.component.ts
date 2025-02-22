import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonTitle } from '@ionic/angular/standalone';

@Component({
    selector: 'app-launch-screen',
    templateUrl: './launch-screen.component.html',
    styleUrls: ['./launch-screen.component.scss'],
    imports: [IonTitle, IonContent]
})
export class LaunchSreenComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { 
        // setTimeout(() => {
        //     console.log('Redirecting to onboarding...');
        //     this.router.navigate(['/onboarding']);
        // }, 3000);
    }

}
