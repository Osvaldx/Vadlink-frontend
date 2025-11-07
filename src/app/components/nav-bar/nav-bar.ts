import { Component } from '@angular/core';
import { NavButton } from "../nav-button/nav-button";
import { Auth } from '../../services/auth';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-nav-bar',
  imports: [NavButton, NgIcon],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  constructor(private readonly authService: Auth) { }

  async logOut(){
    this.authService.signOut();
  }

}
