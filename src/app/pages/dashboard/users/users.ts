import { Component } from '@angular/core';
import { UsersTable } from '../../../components/users-table/users-table';
import { FormRegister } from "../../../components/form-register/form-register";

@Component({
  selector: 'app-users',
  imports: [UsersTable, FormRegister],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

}
