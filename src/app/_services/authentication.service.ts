import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, OTPRequest, RegisterRequest } from '../_models/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl = environment.apiUrl + '/auth';
    private tokenKey = "token";

    constructor(
        private http: HttpClient
    ) { }

    login(req: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req);
    }

    register(req: RegisterRequest) {
        return this.http.post<any>(`${this.apiUrl}/register`, req);
    }

    // TODO : change the behavior on the backend
    resendVerificationCode(req: OTPRequest) {
        return this.http.post<any>(`${this.apiUrl}/resend-confirmation-email`, req);
    }

    verifyOTP(req: OTPRequest) {
        return this.http.post<string>(`${this.apiUrl}/verify-otp`, req);
    }

    // TODO : add the feature on the backend
    forgotPassword(email: string) {
        return this.http.post<string>(`${this.apiUrl}/forgot-password`, { email });
    }

    saveToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    saveSessionID(sessionID: string) {
        sessionStorage.setItem("sessionID", sessionID);
    }

    getSessionID(): string | null {
        return sessionStorage.getItem("sessionID");
    }

    clearSessionID() {
        sessionStorage.removeItem("sessionID");
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }
}
