import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../_models/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = environment.apiUrl + '/auth';
    private tokenKey = "token";

    constructor(
        private http: HttpClient
    ) { }

    login(req: LoginRequest) {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req);
    }

    saveToken(token: string) {
        localStorage
            .setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage
            .getItem(this.tokenKey);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }
}
