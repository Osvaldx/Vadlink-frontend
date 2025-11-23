import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { UserData } from '../../interfaces/user-data';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  imports: [AsyncPipe, DatePipe, UpperCasePipe, NgIcon],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable implements OnInit{

  public users!: Observable<UserData[]>;

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.findAllUsers();

    this.users = this.adminService.getUsersObservable();
  }

  public enableOrDisableUser(user: UserData, value: boolean) {
    this.adminService.enableOrDisableUserLocal(user, value);
  }

}
