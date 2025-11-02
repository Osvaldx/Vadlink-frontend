import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from "@angular/router";
import { ButtonClickAnimation } from "../../../directives/button-click-animation";
import { ValidateErrorsInput } from "../../../directives/validate-errors-input";

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

export function ValidationEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regExMail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

    const hasCorrectMail = regExMail.test(control.value);

    return (hasCorrectMail) ? null : { email: { hasCorrectMail: hasCorrectMail } };
  }
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIcon, RouterLink, ButtonClickAnimation, ValidateErrorsInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, ValidationEmail()]),
    password: new FormControl('', [Validators.required, ValidatepasswordWrong()])
  })
  
  public showPassword = signal<boolean>(false);

  public togglePassord(): void {
    this.showPassword.update(p => !p);
  }

  public sendCredentials() {
    console.log(this.loginForm.get('email')?.value);
    console.log(this.loginForm.get('password')?.value);
  }

}
