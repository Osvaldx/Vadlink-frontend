import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { Router, RouterLink } from "@angular/router";
import { ButtonClickAnimation } from "../../../directives/button-click-animation";
import { ValidateErrorsInput } from "../../../directives/validate-errors-input";
import { ValidationEmail } from '../../../validators/email.validator';
import { Auth } from '../../../services/auth';
import { SignInCredentials } from '../../../interfaces/sign-in-credentials';
import { ValidateInvalidChars } from '../../../validators/username.validator';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIcon, RouterLink, ButtonClickAnimation, ValidateErrorsInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  public loginWithUsername = signal<boolean>(false);
  public showPassword = signal<boolean>(false);
  public formDisabled = signal<boolean>(true);

  public loginForm = new FormGroup({
    email: new FormControl('', [ValidationEmail()]),
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(20), ValidateInvalidChars()]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private readonly authService: Auth, private readonly router: Router) {
    this.loginForm.valueChanges.subscribe(() => this.checkLoginDisabled());
  }

  ngOnInit(): void {
    if(this.authService.currentUser()) {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

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
    this.formDisabled.set(true);
  }

  private isEmpty(cadena: string | null) {
    return (cadena === '' || cadena === null || cadena === undefined);
  }

  private checkLoginDisabled(): void {
    const controls = this.loginForm.controls;
    const emailEmpty = this.isEmpty(controls.email.value);
    const usernameEmpty = this.isEmpty(controls.username.value);
    const passwordEmpty = this.isEmpty(controls.password.value);
  
    const activeIsEmail = !this.loginWithUsername();
  
    const hasEmailError = activeIsEmail ? !!controls.email.errors : false;
    const hasUsernameError = !activeIsEmail ? !!controls.username.errors : false;
    const hasPasswordError = !!controls.password.errors;
  
    const hasErrors = hasEmailError || hasUsernameError || hasPasswordError;
    const isDisabled = ((emailEmpty && usernameEmpty) || passwordEmpty || hasErrors);
  
    this.formDisabled.set(isDisabled);
  }

}
