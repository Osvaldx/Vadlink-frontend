import { Component, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-screen-loading',
  imports: [],
  templateUrl: './screen-loading.html',
  styleUrl: './screen-loading.css',
})
export class ScreenLoading implements OnInit{

  public isLoading = signal<boolean>(false);

  constructor(private readonly authService: Auth) {}

  ngOnInit(): void {
    this.authService.getLoadingObservable().subscribe(value => {
      this.isLoading.set(value);
    })
  }

}
