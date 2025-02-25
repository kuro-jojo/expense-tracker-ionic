import { Component, input, OnInit } from '@angular/core';
import { IonToast } from '@ionic/angular/standalone';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    imports: [IonToast],
})
export class ToastComponent implements OnInit {
    showSuccess = input<boolean>(false);
    showError = input<boolean>(false);
    message = input.required<string>();

    isLogginSuccess = false;
    isLogginFailed = false;

    constructor() {
    }

    ngOnInit() {
        this.isLogginSuccess = this.showSuccess();
        this.isLogginFailed = this.showError();
    }


    showSuccessToast(isOpen: boolean) {
        this.isLogginSuccess = isOpen;
    }

    showFailureToast(isOpen: boolean) {
        this.isLogginFailed = isOpen;
    }
}
