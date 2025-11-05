import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-nav-button',
  imports: [NgIcon, RouterLink, RouterLinkActive],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css',
})
export class NavButton implements OnInit{

  @Input() nameIcon!: string;
  @Input() title!: string;
  @Input() router!: string;
  @Input() isLogout?: boolean = false;

  public styles: string = 'm-2 px-2 py-1 rounded-2xl cursor-pointer flex justify-center items-center gap-1.5 font-semibold hover:scale-105 duration-300 transition-all ';
  
  ngOnInit(): void {
    if(this.isLogout) {
      this.styles += 'text-red-400 hover:text-red-500 '
    } else {
      this.styles += 'text-neutral-400 hover:text-neutral-300 '
    }
  }

}
