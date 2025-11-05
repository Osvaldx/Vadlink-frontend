import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import { NavButton } from '../../components/nav-button/nav-button';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavButton],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  constructor(private readonly authService: Auth) { }

  async logOut(){
    this.authService.signOut();
  }

}
