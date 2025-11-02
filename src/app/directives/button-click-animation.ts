import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonClickAnimation]'
})
export class ButtonClickAnimation {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.render.addClass(this.el.nativeElement, 'transition-all');
    this.render.addClass(this.el.nativeElement, 'duration-300')
    this.render.addClass(this.el.nativeElement, 'scale-105');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.render.removeClass(this.el.nativeElement, 'scale-105');
    
  }
  
  @HostListener('mousedown') onMouseDown() {
    this.render.removeClass(this.el.nativeElement, 'scale-105');
    this.render.addClass(this.el.nativeElement, 'scale-95');
  }
  
  @HostListener('mouseup') onMouseUp() {
    this.render.removeClass(this.el.nativeElement, 'scale-95');
    this.render.addClass(this.el.nativeElement, 'scale-105');
  }

}
