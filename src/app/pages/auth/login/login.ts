import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from "@angular/router";
import { ButtonClickAnimation } from "../../../directives/button-click-animation";
import { ValidateErrorsInput } from "../../../directives/validate-errors-input";
import { ValidatepasswordWrong } from '../../../validators/passwordWrong.validator';
import { ValidationEmail } from '../../../validators/email.validator';
import { Auth, SignInCredentials } from '../../../services/auth';

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

  constructor(private readonly authService: Auth) { }

  public togglePassword(): void {
    this.showPassword.update(p => !p);
  }

  public sendCredentials(): void {
    const form = this.loginForm.controls;
    const emailOrUsername = ((form.email.value != '') ? form.email.value : form.username.value);
    const password = form.password.value;

    if(!emailOrUsername || !password) return;
    
    const credentials: SignInCredentials = {
      emailOrUsername: emailOrUsername,
      password: password
    }

    this.authService.signIn(credentials);
  }

  public toggleLoginWith(): void {
    (this.loginWithUsername()) ? this.loginForm.controls.email.reset() : this.loginForm.controls.username.reset();
    this.loginWithUsername.update(l => !l);
  }

  public loginDisabled(): boolean {
    const emailEmpty = this.loginForm.controls.email.value === '';
    const usernameEmpty = this.loginForm.controls.username.value === '';
    const passwordEmpty = this.loginForm.controls.password.value === '';

    const controls = this.loginForm.controls;
    const hasEmailError = (controls.email.errors) ? true : false;
    const hasUsernameError = (controls.username.errors) ? true : false;
    const hasPasswordError = (controls.password.errors) ? true : false;
    const hasErrors = (emailEmpty) ? (hasUsernameError || hasPasswordError) : (hasEmailError || hasPasswordError);

    const isDisabled = (((emailEmpty && usernameEmpty) || passwordEmpty) || hasErrors);

    return isDisabled;
  }

}
