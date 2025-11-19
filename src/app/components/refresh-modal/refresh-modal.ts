import { Component, OnInit, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-refresh-modal',
  imports: [NgIcon],
  templateUrl: './refresh-modal.html',
  styleUrl: './refresh-modal.css',
})
export class RefreshModal implements OnInit{

  public showModal = signal<boolean>(false);

  constructor(private readonly authService: Auth) {}

  ngOnInit(): void {
    this.authService.getModalObservable().subscribe(value => {
      console.log(value);
      this.showModal.set(value);
    })
  }

  public signOut() {
    this.authService.signOut();
    this.authService.resetModalSubject();
  }
  
  public refreshToken() {
    this.authService.refreshToken();
    this.authService.resetModalSubject();
  }

}
