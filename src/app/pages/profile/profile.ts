import { Component, Pipe } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserData } from '../../interfaces/user-data';
import { NgIcon } from '@ng-icons/core';
import { DatePipe } from '@angular/common';
import { CustomPost } from "../../components/custom-post/custom-post";

@Component({
  selector: 'app-profile',
  imports: [NgIcon, DatePipe, CustomPost],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  public data!: UserData | null;
  public create_at!: Date;
  public dateofbirth!: Date;

  constructor(private readonly authService: Auth) {
    if(authService.currentUser()) {
      this.data = authService.currentUser();
      this.create_at = new Date(this.data?.createDate!);
      this.dateofbirth = new Date(this.data?.dateofbirth!);
    }
  }

}
