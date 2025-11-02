import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormErrorService } from '../services/form-error-service';

@Directive({
  selector: '[appValidateErrorsInput]'
})
export class ValidateErrorsInput implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() control!: string;

  private ElementAlertExits = signal<boolean>(false);
  private CreatedElement: any;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private formErrorService: FormErrorService
  ) { }

  ngOnInit(): void {
    const formControl = this.formGroup.get(this.control);
    
    if(!formControl) {
      console.warn("[!] Controlador no encontrado");
      return;
    }
    
    formControl.statusChanges.subscribe(() => {
      this.showAlertError(!!formControl.errors && formControl.touched);
    })

    formControl.valueChanges.subscribe(() => {
      this.showAlertError(!!formControl.errors && formControl.touched);
    })

  }

  // Detectar cuándo el input pierde el foco
  @HostListener('blur') onBlur(): void {
    const formControl = this.formGroup.get(this.control);
    if (!formControl) return;

    this.showAlertError(!!formControl.errors && formControl.touched);
  }

  private showAlertError(hasError: boolean) {
    if(hasError) {
      this.render.removeClass(this.el.nativeElement, 'border-neutral-600');
      this.render.addClass(this.el.nativeElement, 'border-red-500');
      this.render.addClass(this.el.nativeElement, 'focus:outline-none');
      this.render.addClass(this.el.nativeElement, 'focus:border-red-500');
      
      const message = this.formErrorService.getMessageError(this.formGroup, this.control);
      
      this.createElementAlert(message!);
    } else {
      this.render.removeClass(this.el.nativeElement, 'border-red-500');
      this.render.removeClass(this.el.nativeElement, 'focus:outline-none');
      this.render.removeClass(this.el.nativeElement, 'focus:border-red-500');
      this.render.addClass(this.el.nativeElement, 'border-neutral-600');
      this.deleteElement();
    }
  }

  private createElementAlert(message: string) {
    if(!this.ElementAlertExits()) {
      const p = this.render.createElement('p');
      const text = this.render.createText(message);
      
      this.render.addClass(p, 'text-red-500');
      this.render.addClass(p, 'text-[12px]');
      this.render.addClass(p, 'm-2');
      this.render.appendChild(p, text);

      this.render.appendChild(this.el.nativeElement.parentNode, p);
      this.CreatedElement = p;
      this.ElementAlertExits.set(true);
    } else {
      const p = this.CreatedElement;

      while(p.firstChild) {
        this.render.removeChild(p, p.firstChild);
      }

      const text = this.render.createText(message);
      this.render.appendChild(p, text);
    }
  }

  private deleteElement() {
    if(this.ElementAlertExits()) {
      this.render.removeChild(this.el.nativeElement, this.CreatedElement);
      this.CreatedElement = null;
      this.ElementAlertExits.set(false);
    }
  }

}
