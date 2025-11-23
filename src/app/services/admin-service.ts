import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserData } from '../interfaces/user-data';
import { BehaviorSubject } from 'rxjs';
import { MessageManager } from './message-manager';

type resUserStatus = {
  statusCode: number
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private apiUrl = 'https://vadlink-backend.vercel.app/users';
  // private apiUrl = 'http://localhost:3000/users';

  private usersSubject = new BehaviorSubject<UserData[]>([]);

  constructor(private readonly http: HttpClient, private readonly msgService: MessageManager) { }

  private orderUserList(array: UserData[]) {
    return array.sort((a, b) => {
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    });
  }

  private addNewListLocal(list: UserData[]) {
    this.usersSubject.next((list.length > 0) ? this.orderUserList(list) : list);
  }

  public findAllUsers() {
    this.http.get<UserData[]>(this.apiUrl).subscribe({
      next: (users) => {
        this.addNewListLocal(users);
      },
      error: () => {
        this.addNewListLocal([]);
      }
    })
  }

  public enableStatusUserDB(route: string) {
    this.http.post<resUserStatus>(route, {}).subscribe({
      next: (res) => {
        this.msgService.add('success', res.message, 3);
      },
      error: (err) => {
        this.msgService.add('error', err.message, 3);
      }
    })
  }

  public disableStatusUserDB(route: string) {
    this.http.delete<resUserStatus>(route).subscribe({
      next: (res) => {
        this.msgService.add('success', res.message, 3);
      },
      error: (err) => {
        this.msgService.add('error', err.message, 3);
      }
    })
  }

  public changeStatusUserDB(userId: string, value: boolean) {
    const routeEnableOrDisable = (value) ? 'disable' : 'enable';
    const route = this.apiUrl + `/${routeEnableOrDisable}/${userId}`;

    if(value) {
      this.disableStatusUserDB(route);
    } else {
      this.enableStatusUserDB(route);
    }
  }

  public enableOrDisableUserLocal(user: UserData, value: boolean) {
    const newUser: UserData = {...user, isDisabled: value};

    this.addNewUserLocalList(newUser);
    this.changeStatusUserDB(user._id, value);
  }

  public getUsersObservable() {
    return this.usersSubject.asObservable();
  }

  private generateNewList(newUser: UserData) {
    const newListUsers = this.usersSubject.value.filter(u => u._id != newUser._id);

    console.log("por retornar la lista con el usuario nuevo");
    return [...newListUsers, newUser];
  }

  public addNewUserLocalList(newUser: UserData) {
    const newList = this.generateNewList(newUser);
    this.addNewListLocal(newList);
  }
  
}
