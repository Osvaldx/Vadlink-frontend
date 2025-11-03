import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidationEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regExMail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
  
      const hasCorrectMail = regExMail.test(control.value);
  
      return (hasCorrectMail) ? null : { email: { hasCorrectMail: hasCorrectMail } };
    }
  }