import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MessageType } from '../../enums/message-type';

@Component({
  selector: 'app-toast-message',
  imports: [NgIcon],
  templateUrl: './toast-message.html',
  styleUrl: './toast-message.css',
})
export class ToastMessage implements OnInit{

  @Input() type!: MessageType;
  @Input() message!: string;
  @Input() duration!: number;
  @Output() closed = new EventEmitter<void>();

  // animate-fade-out-right -> morir

  public icon!: string;
  public isDead = signal<boolean>(false);
  public styles: string = 'z-40 min-w-[150px] max-w-[330px] px-3 py-2 transition-all duration-800 font-bold rounded-xl animate-fade-in-left ';
  public stylesX: string = 'select-none px-1 rounded-xl cursor-pointer ';

  public toastDuration = signal<number>(0);
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    this.startTimer();
  }

  ngOnInit(): void {
    switch(this.type) {
      case MessageType.success:
        this.icon = 'faSolidCircleCheck';
        this.styles += 'bg-green-200 border border-green-800 text-green-600';
        this.stylesX += 'hover:bg-green-300';
        break;
      case MessageType.error:
        this.icon = 'faSolidCircleXmark';
        this.styles += 'bg-red-200 border border-red-800 text-red-500';
        this.stylesX += 'hover:bg-red-300';
        break;
      case MessageType.warn:
        this.icon = 'faSolidCircleExclamation';
        this.styles += 'bg-yellow-100 border border-yellow-800 text-yellow-600';
        this.stylesX += 'hover:bg-yellow-400';
        break;
    }
  }

  private startTimer() {
    this.timer = setInterval(() => {

      this.toastDuration.update(d => d + 1);

      if(this.toastDuration() == this.duration) {
        this.killTimer();
      }
    }, 1000);
  }

  public killTimer() {
    if(this.timer) {
      clearInterval(this.timer);
      this.isDead.set(true);
      setTimeout(() => { this.closed.emit(); }, 300);
    }
    this.timer = null;
  }

}
