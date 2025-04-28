import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-launch-screen',
    templateUrl: './launch-screen.component.html',
    styleUrls: ['./launch-screen.component.scss'],
    imports: []
})
export class LaunchSreenComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/onboarding']);
        }, 2000);
    }
}
