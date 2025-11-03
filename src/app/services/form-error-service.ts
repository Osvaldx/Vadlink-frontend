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
    }

    else if(errors['email']) {
      const details = errors['email'];
      if(!details.hasCorrectMail) return '[!] El correo es invalido!';
    }

    else if(errors['minlength']) {
      const details = errors['minlength'];
      return `[!] El minimó de caracteres es: ${details.requiredLength}`;
    }

    else if(errors['maxlength']) {
      const details = errors['maxlength'];
      return `[!] El maximo de caracteres es: ${details.requiredLength}`;
    }

    else if(errors['passwordWrong']) {
      const details = errors['passwordWrong'];
      if(!details.hasMinLength) return '[!] La contraseña tiene que ser mayor a 8 caracteres!';
      if(!details.hasButOneCapitalLetter) return '[!] La contraseña tiene que tener al menos 1 letra en mayus!';
      if(!details.hasButOneNumber) return '[!] La contraseña tiene que tener al menos 1 número!';
    }

    else if(errors['validateDateOfBirth']) {
      const details = errors['validateDateOfBirth'];
      if(details.isFuture) return '[!] La fecha de nacimiento no puede ser futura';
      if(details.isOld) return '[!] La fecha indica que eres muy mayor';
      if(details.isYoung) return '[!] Eres demasiado joven';
    }
    
    else if(errors['InvalidImage']) {
      const details = errors['InvalidImage'];
      if(details.tooBig) return `[!] Archivo demasiado grande MAXIMO: ${details.requiredSize}`;
      if(details.badType) return `[!] Archivos permitidos: ${details.availableTypes}`;
    }

    console.warn(errors);
    return '[!] Error no registrado:';
  }
  
}
