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
import { Auth } from '../../../services/auth';
import { ValidateInvalidChars } from '../../../validators/username.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIcon, ButtonClickAnimation, ValidateErrorsInput, RouterLink, InputUploadImage],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  public showPassword = signal<boolean>(false);
  public resetImage = signal<boolean>(false);
  public maxDate = new Date().toISOString().split('T')[0];

  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), ValidateInvalidChars()]),
    lastName: new FormControl('', [ValidateInvalidChars()]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), ValidateInvalidChars()]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
    dateofbirth: new FormControl('', [Validators.required, ValidateDateOfBirth()]),
    email: new FormControl('', [Validators.required, ValidationEmail()]),
    password: new FormControl('', [Validators.required, ValidatepasswordWrong()]),
    repeatPassword: new FormControl('', [Validators.required, ValidatepasswordWrong()]),
    avatar: new FormControl<File | null>(null, [ValidateImageFile({ maxSizeMB: 2, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] })])
  },
  { validators: [ValidateMatchPasswords('password', 'repeatPassword')] });

  constructor(private readonly authService: Auth) { }

  public sendCredentials(): void {
    if(this.registerForm.errors) return;

    const control = this.registerForm.controls;

    if(!control.dateofbirth.value) return;
    const [year, month, day] = control.dateofbirth.value?.split('-').map(Number);
    const dateofbirth = new Date(year, month-1, day);

    const formData = new FormData();
    formData.append('firstName', control.firstName.value!);
    formData.append('username', control.username.value!);
    formData.append('dateofbirth', dateofbirth.toISOString());
    formData.append('email', control.email.value!);
    formData.append('password', control.password.value!);

    if (control.lastName.value) formData.append('lastName', control.lastName.value);
    if (control.description.value) formData.append('description', control.description.value);

    const file = control.avatar.value;
    if (file) formData.append('avatar', file);
    
    this.authService.signUp(formData);
    this.resetImage.set(true);
    this.registerForm.reset();
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
