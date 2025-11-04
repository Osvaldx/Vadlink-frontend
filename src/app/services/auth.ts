import { HttpClient } from '@angular/common/http';
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
  id: string,
  fistName: string,
  lastName: string,
  username: string,
  rol: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  public currentUser = signal<UserData | null>(null);

  public signIn(credentials: SignInCredentials) {
    const request = this.httpClient.post(this.apiUrl + '/auth/login', credentials);

    request.subscribe((request) => {
      console.log(request);
    })

  }

  public signUp(credentials: SignUpData) {
    const request = this.httpClient.post(this.apiUrl + '/auth/register', credentials);

    request.subscribe((request) => {
      console.log(request);
    })
  }

  public verifyJwt() {
    const request = this.httpClient.post(this.apiUrl + '/auth/data', {});

    request.subscribe((request) => {
      console.log(request);
    })
  }
}
