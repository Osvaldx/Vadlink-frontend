import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  public data!: UserData | null;

  constructor(private readonly authService: Auth) {
    if(authService.currentUser()) {
      this.data = authService.currentUser();
    }
  }

}
