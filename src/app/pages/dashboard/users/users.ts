import { Component, OnInit } from '@angular/core';
import { UsersTable } from '../../../components/users-table/users-table';
import { FormRegister } from "../../../components/form-register/form-register";
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-users',
  imports: [UsersTable, FormRegister],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit{

  constructor(private readonly authService: Auth) {}

  ngOnInit(): void {
    this.authService.setLoading(true);
    setTimeout(() => {
      this.authService.setLoading(false);
    }, 1000);
  }

}
