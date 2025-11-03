import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatepasswordWrong(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cadena = control.value;
      const regExButOneCapitalLetter = new RegExp('^(?=.*[A-Z]).+$');
      const regExButOneNumber = new RegExp('[0-9]');
  
      const hasMinLengthTest = ((String (cadena)).length >= 8);
      const hasButOneCapitalLetterTest = regExButOneCapitalLetter.test(control.value);
      const hasButOneNumberTest = regExButOneNumber.test(control.value);
      
      return (hasMinLengthTest && hasButOneCapitalLetterTest && hasButOneNumberTest) ? null : {
        passwordWrong: {
          hasMinLength: hasMinLengthTest,
          hasButOneCapitalLetter: hasButOneCapitalLetterTest,
          hasButOneNumber: hasButOneNumberTest
        }
      }
    }
  }