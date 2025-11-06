import { Component } from '@angular/core';
import { ToastMessage } from '../toast-message/toast-message';
import { ToastFormat } from '../../interfaces/toast-format';
import { MessageManager } from '../../services/message-manager';

@Component({
  selector: 'app-toasts-manager',
  imports: [ToastMessage],
  templateUrl: './toasts-manager.html',
  styleUrl: './toasts-manager.css',
})
export class ToastsManager {

  public toasts;

  constructor(private msgManager: MessageManager) {
    this.toasts = msgManager.getToasts;
  }

  public removeToast(id: string) {
    this.msgManager.remove(id);
  }

}
