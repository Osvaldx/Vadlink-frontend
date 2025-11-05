import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  constructor(private readonly authService: Auth, private readonly router: Router) { }

  async logOut(){
    this.authService.signOut();
  }

}
