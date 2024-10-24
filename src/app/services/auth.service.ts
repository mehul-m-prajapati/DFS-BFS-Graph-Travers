import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

declare const gapi: any; // Declare gapi to avoid TypeScript errors

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.BACKEND_API_URL;
  userList: any[] = []; // Initialize userList as an empty array

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
   ) {}

  signUp(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap(() => {
        // Handle successful login (e.g., manage user session)
      })
    );
  }

  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, contactData); // Ensure correct endpoint
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  loginWithGoogle(): void {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;

    }).catch((error: any) => {
      console.error('Google login error', error);
      this.toastr.error('Google login failed', 'Error');
    });
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        // Clear any user info from storage (if applicable)
        this.router.navigate(['/login']); // Redirect to login page after logout
      },
      error: (error) => {
        console.error('Error logging out:', error);
      }
    });
  }

  fetchAllUsers(): void {
    this.getAllUsers().subscribe({
      next: (res: any[]) => {
        this.userList = res; // Ensure userList is assigned properly
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
