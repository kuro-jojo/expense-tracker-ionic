import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {
    IonContent,
    IonButtons,
    IonBackButton,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
    imports: [
        CommonModule,
        IonContent,
        IonButtons,
        IonBackButton,
        IonInput,
        IonButton,
        IonGrid,
        IonRow,
        IonCol
    ],
})
export class VerificationComponent implements OnInit {
    @ViewChildren(IonInput) otpInputs: QueryList<IonInput> | undefined;
    otpValue: string[] = new Array(6).fill('');
    isOtpValid = false;
    canResendCode = false;
    TIMER_DURATION = 10;
    timerText = `00:${this.TIMER_DURATION}`;

    constructor() { }

    ngOnInit() {
        this.updateTimer();
    }

    onOtpInput(index: number) {
        const value = this.otpInputs?.get(index)?.value as string;
        if (value.match(/^[0-9]$/)) {
            this.otpValue[index] = value;
            this.isOtpValid = this.otpValue.join('').length === 6;
            if (index < this.otpValue.length - 1) {
                const nextInput = this.otpInputs?.get(index + 1);
                if (nextInput) {
                    nextInput.setFocus();
                }
            }
        } else {
            this.otpInputs?.get(index)?.writeValue('');
            this.otpValue[index] = '';
            this.isOtpValid = false;
        }
    }

    onKeydown(event: KeyboardEvent, index: number) {
        if (event.key === 'Backspace' && !this.otpValue[index] && index > 0) {
            const previousInput = this.otpInputs?.get(index - 1);
            if (previousInput) {
                previousInput.setFocus();
            }
        }
    }

    sendCode($event: Event) {
        $event.preventDefault();
        this.updateTimer();
    }

    private updateTimer() {
        this.timerText = `00:${this.TIMER_DURATION}`;
        let timer = this.TIMER_DURATION;

        this.canResendCode = false;
        const timerInterval = setInterval(() => {
            timer--;
            this.timerText = `00:${timer < 10 ? '0' + timer : timer}`;
            if (timer === 0) {
                clearInterval(timerInterval);
                this.canResendCode = true;
            }
        }, 1000)
    }

    verifyCode($event: Event) {
        $event.preventDefault();
        console.log('Verify code');
    }
}
