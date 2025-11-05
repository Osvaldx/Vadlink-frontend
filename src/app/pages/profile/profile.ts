import { Component } from '@angular/core';
import { Auth, UserData } from '../../services/auth';

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
