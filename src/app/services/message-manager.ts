import { computed, Injectable, signal } from '@angular/core';
import { ToastFormat } from '../interfaces/toast-format';
import { MessageType } from '../enums/message-type';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MessageManager {

  private toasts = signal<ToastFormat[]>([]);
  public getToasts = computed(() => this.toasts());

  public add(type: 'success' | 'error' | 'warn', message: string, duration: number) {
    let toastType;
    switch(type) {
      case 'success':
        toastType = MessageType.success;
        break;
      case 'error':
        toastType = MessageType.error;
        break;
      case 'warn':
        toastType = MessageType.warn;
        break;
    }

    const toast: ToastFormat = {
      id: uuidV4(),
      type: toastType,
      message,
      duration
    }

    this.toasts.update(list => [toast, ...list]);
  }
  
  public remove(id: string) {
    this.toasts.update(list => list.filter(t => t.id != id));
  }
  
}
