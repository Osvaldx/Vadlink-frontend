import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../interfaces/user-data';
import { SignInCredentials } from '../interfaces/sign-in-credentials';
import { MessageManager } from './message-manager';
import { RefreshData } from '../interfaces/refresh-data';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from './admin-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = environment.apiUrl;

  private refreshTimer: NodeJS.Timeout | null = null;
  private logoutTimer: NodeJS.Timeout | null = null;
  
  private ModalSubject = new BehaviorSubject<boolean>(false);
  public ModalObservable$ = this.ModalSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public $loading = this.loadingSubject.asObservable();

  public currentUser = signal<UserData | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly msgManager: MessageManager,
    private readonly adminService: AdminService
  ) { this.resetModalSubject() }

  public signIn(credentials: SignInCredentials) {
    this.loadingSubject.next(true);
    this.httpClient.post<UserData>(this.apiUrl + '/auth/login', credentials).subscribe({
      next: (user) => {
        this.msgManager.add('success', 'Inicio de sesión exitoso!', 3);
        this.currentUser.set(user as UserData);
        console.log(this.currentUser());
        this.startTokenTimer(user.exp);
        this.router.navigateByUrl('/posts');
        this.loadingSubject.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.currentUser.set(null);
        this.loadingSubject.next(false);
      }
    });

  }

  public signUp(formData: FormData, isAdmin: boolean) {
    this.loadingSubject.next(true);
    this.httpClient.post<UserData>(this.apiUrl + '/auth/register', formData).subscribe({
      next: (user) => {
        this.msgManager.add('success', 'Registro exitoso!', 3);
        if(!isAdmin) {
          this.router.navigateByUrl('/auth/login');
        } else {
          console.log("por agregar el usuario")
          this.adminService.addNewUserLocalList(user);
        }
        this.loadingSubject.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.loadingSubject.next(false);
      }
    });
  }

  public signOut() {
    this.loadingSubject.next(true);
    this.httpClient.post(this.apiUrl + '/auth/logout', {}).subscribe({
      next: (res) => {
        this.msgManager.add('success', 'Cierre de sesión exitoso!', 3);
        console.log(res);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
        this.loadingSubject.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.msgManager.add('error', err.error.message, 3);
        console.log(err);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
        this.loadingSubject.next(false);
      }
    })
  }

  public loadCurrentUser() {
    this.loadingSubject.next(true);
    return new Promise<void>((resolve) => {
      this.httpClient.post<UserData>(this.apiUrl + '/auth/authorize', {}).subscribe({
        next: (user) => {
          console.log(user);
          this.currentUser.set(user as UserData);
          this.startTokenTimer(user.exp);
          this.router.navigate(['/posts']);
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.currentUser.set(null);
          this.router.navigate(['/auth/login']);
          resolve();
        }
      });
    })
  }

  public refreshToken() {
    this.httpClient.post<RefreshData>(this.apiUrl + '/auth/refresh', {}).subscribe({
      next: (res) => {
        console.log(res.message);
        this.startTokenTimer(res.exp);
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error al refrescar token:', err.error.message);
        this.currentUser.set(null);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  private startTokenTimer(exp: number) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    if(this.logoutTimer) clearTimeout(this.logoutTimer);

    if (!this.currentUser()) return;

    // UNIX timestamp en segundos
    const expMs = exp * 1000;
    const now = Date.now();

    const refreshAt = expMs - (10 * 60 * 1000);

    const refreshDelay = refreshAt - now;
    const logoutDelay = expMs - now;

    this.refreshTimer = setTimeout(() => {
      this.ModalSubject.next(true);
    }, refreshDelay);
  
    this.logoutTimer = setTimeout(() => {
      this.currentUser.set(null);
      this.resetModalSubject();
      this.router.navigate(['/auth/login']);
    }, logoutDelay);

  }

  public resetModalSubject() {
    this.ModalSubject.next(false);
  }

  public getModalObservable() {
    return this.ModalObservable$;
  }

  public getLoadingObservable() {
    return this.$loading;
  }

  public setLoading(value: boolean) {
    this.loadingSubject.next(value);
  }
}
