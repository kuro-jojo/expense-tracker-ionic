import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
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
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastComponent } from '../toast/toast.component';

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
        IonCol,
        ToastComponent,
    ],
})
export class VerificationComponent implements OnInit {
    @ViewChildren(IonInput) otpInputs: QueryList<IonInput> | undefined;
    otpValue: string[] = new Array(6).fill('');
    isOtpValid = false;
    canResendCode = false;
    TIMER_DURATION = 10;
    timerText = `00:${this.TIMER_DURATION}`;
    sessionID: string | null = '';

    isVerificationSuccessful = false;
    isVerificationFailed = false;
    toastMessage = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.updateTimer();
        this.sessionID = this.authService.getSessionID();
        if (!this.sessionID) {
            this.router.navigate(['/login']);
        }
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
        } else if (event.key === 'Enter' && this.isOtpValid) {
            this.verifyCode(event);
        }
    }

    sendCode($event: Event) {
        $event.preventDefault();

        this.authService.resendVerificationCode({
            sessionID: this.sessionID!
        }).subscribe({
            next: (res) => {
                this.isVerificationSuccessful = true;
                this.toastMessage = 'Code sent successfully';

                this.authService.saveSessionID(res?.sessionID);
                this.sessionID = res?.sessionID;
                this.updateTimer();
            },
            error: (err) => {
                console.error('Resend code failed', err);
                this.isVerificationFailed = true;
                this.toastMessage = 'Failed to send code';
            }
        });

        this.otpValue = new Array(6).fill('');
        this.isOtpValid = false;
        this.otpInputs?.forEach((input) => {
            input.writeValue('');
        });

        this.isVerificationSuccessful = false;
        this.isVerificationFailed = false;
        this.toastMessage = '';
    }

    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedData = event.clipboardData?.getData('text') || '';
        if (pastedData.match(/^[0-9]{6}$/)) {
            this.otpValue = pastedData.split('');
            this.isOtpValid = true;
            this.otpInputs?.forEach((input, index) => {
                input.writeValue(this.otpValue[index]);
            });
        }
    }

    verifyCode($event: Event) {
        $event.preventDefault();
        this.authService.verifyOTP({
            sessionID: this.sessionID!,
            otp: this.otpValue.join('')
        }).subscribe({
            next: (res) => {
                console.log('Verify OTP success', res);
                this.isVerificationSuccessful = true;
                this.toastMessage = 'Verification successful';
                this.authService.clearSessionID();

                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1000);
            },
            error: (err) => {
                console.error('Verify OTP failed', err);
                this.isVerificationFailed = true;
                this.toastMessage = 'Invalid OTP';
            }
        });

        this.isVerificationFailed = false;
        this.isVerificationSuccessful = false;
        this.toastMessage = '';
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
}
