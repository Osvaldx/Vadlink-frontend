import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverAnimation]'
})
export class HoverAnimation {

  @Input('appHoverAnimation') hoverClass: string = '';

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.hoverClass) {
      this.render.addClass(this.el.nativeElement, this.hoverClass);
      this.render.addClass(this.el.nativeElement, 'transition-all');
      this.render.addClass(this.el.nativeElement, 'duration-300');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.hoverClass) {
      this.render.removeClass(this.el.nativeElement, this.hoverClass);
    }
  }

}
