import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface SignInCredentials {
  emailOrUsername: string,
  password: string
}

export interface SignUpData {
  firstName: string,
  lastName?: string,
  username: string,
  description?: string,
  dateofbirth: string,
  email: string,
  password: string,
  avatar?: File
}

export interface UserData {
  _id: string,
  firstName: string,
  lastName: string,
  username: string,
  rol: string,
  description: string,
  dateofbirth: string,
  email: string,
  avatar: string,
  avatar_id: string,
  createDate: string,
  __v: number,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'https://vadlink-backend.vercel.app';

  public currentUser = signal<UserData | null>(null);

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

  public signIn(credentials: SignInCredentials) {
    this.httpClient.post(this.apiUrl + '/auth/login', credentials).subscribe({
      next: (user) => {
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        console.log("[!] Fallo");
        console.log(err);
        this.currentUser.set(null);
      }
    });

  }

  public signUp(formData: FormData) {
    this.httpClient.post(this.apiUrl + '/auth/register', formData).subscribe({
      next: (user) => {
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        console.log("[!] Fallo");
        this.currentUser.set(null);
      }
    });
  }

  public signOut() {
    this.httpClient.post(this.apiUrl + '/auth/logout', {}).subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
      },
      error: (err: HttpErrorResponse) => {
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
