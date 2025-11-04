import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from "@angular/router";
import { ButtonClickAnimation } from "../../../directives/button-click-animation";
import { ValidateErrorsInput } from "../../../directives/validate-errors-input";
import { ValidatepasswordWrong } from '../../../validators/passwordWrong.validator';
import { ValidationEmail } from '../../../validators/email.validator';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIcon, RouterLink, ButtonClickAnimation, ValidateErrorsInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  public loginWithUsername = signal<boolean>(false);

  public loginForm = new FormGroup({
    email: new FormControl('', [ValidationEmail()]),
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, ValidatepasswordWrong()])
  })
  
  public showPassword = signal<boolean>(false);

  public togglePassword(): void {
    this.showPassword.update(p => !p);
  }

  public sendCredentials(): void {
    console.log(this.loginForm.get('email')?.value);
    console.log(this.loginForm.get('password')?.value);
  }

  public toggleLoginWith(): void {
    this.loginWithUsername.update(l => !l);
  }

  public loginDisabled(): boolean {
    const hasErrors = !!this.loginForm.errors;
    const emailEmpty = this.loginForm.controls.email.value === '';
    const usernameEmpty = this.loginForm.controls.username.value === '';
    const isDisabled = hasErrors || (emailEmpty && usernameEmpty);

    return isDisabled;
  }

}
