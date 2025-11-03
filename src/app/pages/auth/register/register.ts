import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatepasswordWrong } from '../../../validators/passwordWrong.validator';
import { ValidationEmail } from '../../../validators/email.validator';
import { ValidateMatchPasswords } from '../../../validators/matchpasswords.validator';
import { ValidateDateOfBirth } from '../../../validators/dateofbirth.validator';
import { ValidateImageFile } from '../../../validators/imageFile.validator';
import { NgIcon } from '@ng-icons/core';
import { ButtonClickAnimation } from '../../../directives/button-click-animation';
import { ValidateErrorsInput } from '../../../directives/validate-errors-input';
import { RouterLink } from '@angular/router';
import { InputUploadImage } from "../../../components/input-upload-image/input-upload-image";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIcon, ButtonClickAnimation, ValidateErrorsInput, RouterLink, InputUploadImage],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  public showPassword = signal<boolean>(false);

  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastName: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    description: new FormControl(''),
    dateofbirth: new FormControl('', [Validators.required, ValidateDateOfBirth()]),
    email: new FormControl('', [Validators.required, ValidationEmail()]),
    password: new FormControl('', [Validators.required, ValidatepasswordWrong()]),
    repeatPassword: new FormControl('', [Validators.required, ValidatepasswordWrong()]),
    avatar: new FormControl<File | null>(null, [ValidateImageFile({ maxSizeMB: 2, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] })])
  },
  { validators: [ValidateMatchPasswords('password', 'repeatPassword')] });

  public sendCredentials(): void {
    if(!this.registerForm.errors) {
      const control = this.registerForm.controls;
      console.log(`
        ${control.firstName.value}
        ${control.lastName.value}
        ${control.username.value}
        ${control.description.value}
        ${control.dateofbirth.value}
        ${control.email.value}
        ${control.password.value}
        ${control.repeatPassword.value}
        ${control.avatar.value?.text}
        `)
    }
  }

  public togglePassword(): void {
    this.showPassword.update(p => !p);
  }

  public formDisabled(): boolean {
    const form = this.registerForm;
    const control = form.controls;

    const error = (
      form.errors ||
      control.firstName.errors ||
      control.lastName.errors ||
      control.username.errors ||
      control.description.errors ||
      control.dateofbirth.errors ||
      control.email.errors ||
      control.password.errors ||
      control.repeatPassword.errors ||
      control.avatar.errors
    );

    return error ? true : false;
  }
}
