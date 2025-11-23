import { Component, OnInit } from '@angular/core';
import { NavButton } from "../nav-button/nav-button";
import { Auth } from '../../services/auth';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-nav-bar',
  imports: [NavButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  public user!: UserData | null;

  public styles = 'bg-neutral-800/90 shadow-xl/20 px-2 rounded-2xl flex justify-evenly items-center max-sm:w-full max-sm:justify-between max-sm:px-8 ';

  constructor(private readonly authService: Auth) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }

  async logOut(){
    this.authService.signOut();
  }

}
