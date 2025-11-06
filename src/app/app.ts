import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsManager } from './components/toasts-manager/toasts-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsManager],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vadlink-frontend');
}
