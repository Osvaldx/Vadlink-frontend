import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsManager } from './components/toasts-manager/toasts-manager';
import { RefreshModal } from "./components/refresh-modal/refresh-modal";
import { ScreenLoading } from "./components/screen-loading/screen-loading";
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsManager, RefreshModal, ScreenLoading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('vadlink-frontend');

  constructor(private readonly authService: Auth) {}

  ngOnInit(): void {
    this.authService.loadCurrentUser().then(() => {
      this.authService.setLoading(false);
    })
  }
}
