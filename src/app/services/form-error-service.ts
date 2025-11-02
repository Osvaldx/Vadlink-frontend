import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {

  public getMessageError(formGroup: FormGroup, control: string): string | null {
    const formControl = formGroup.get(control);

    if(!formControl || !formControl?.errors || !formControl?.touched) {
      return null;
    }

    const errors = formControl.errors;

    if(errors['required']) {
      return '[!] Este campo es requerido!';
    } else if(errors['email']) {
      const details = errors['email'];
      if(!details.hasCorrectMail) return '[!] El correo es invalido!';
    } else if(errors['passwordWrong']) {
      const details = errors['passwordWrong'];
      if(!details.hasMinLength) return '[!] La contraseña tiene que ser mayor a 8 caracteres!';
      if(!details.hasButOneCapitalLetter) return '[!] La contraseña tiene que tener al menos 1 letra en mayus!';
      if(!details.hasButOneNumber) return '[!] La contraseña tiene que tener al menos 1 número!';
    }

    return '[!] Error no registrado:';
  }
  
}
