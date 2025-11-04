import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

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
  avatar?: string
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

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  public currentUser = signal<UserData | null>(null);

  public signIn(credentials: SignInCredentials) {
    this.httpClient.post(this.apiUrl + '/auth/login', credentials).subscribe({
      next: (user) => {
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
      },
      error: () => {
        console.log("[!] Fallo");
        this.currentUser.set(null);
      }
    });

  }

  public signUp(credentials: SignUpData) {
    this.httpClient.post(this.apiUrl + '/auth/register', credentials).subscribe({
      next: (user) => {
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
      },
      error: () => {
        console.log("[!] Fallo");
        this.currentUser.set(null);
      }
    });
  }

  public verifyJwt() {
    const request = this.httpClient.post(this.apiUrl + '/auth/data', {});

    request.subscribe((request) => {
      console.log(request);
    })
  }
}
