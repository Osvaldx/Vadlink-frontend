import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../interfaces/user-data';
import { SignInCredentials } from '../interfaces/sign-in-credentials';
import { MessageManager } from './message-manager';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'https://vadlink-backend.vercel.app';
  // private apiUrl = 'http://localhost:3000';

  public currentUser = signal<UserData | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly msgManager: MessageManager
  ) { }

  public signIn(credentials: SignInCredentials) {
    this.httpClient.post(this.apiUrl + '/auth/login', credentials).subscribe({
      next: (user) => {
        this.msgManager.add('success', 'Inicio de sesión exitoso!', 3);
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.currentUser.set(null);
      }
    });

  }

  public signUp(formData: FormData) {
    this.httpClient.post(this.apiUrl + '/auth/register', formData).subscribe({
      next: (user) => {
        this.msgManager.add('success', 'Registro exitoso!', 3);
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.currentUser.set(null);
      }
    });
  }

  public signOut() {
    this.httpClient.post(this.apiUrl + '/auth/logout', {}).subscribe({
      next: (res) => {
        this.msgManager.add('success', 'Cierre de sesión exitoso!', 3);
        console.log(res);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
      }
    })
  }

  public loadCurrentUser() {
    return new Promise<void>((resolve) => {
      this.httpClient.post(this.apiUrl + '/auth/data', {}).subscribe({
        next: (user) => {
          this.currentUser.set(user as UserData);
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.currentUser.set(null);
          resolve();
        }
      });
    })
  }

  public verifyJwt() {
    const request = this.httpClient.post(this.apiUrl + '/auth/data', {});

    request.subscribe((request) => {
      console.log(request);
    })
  }
}
