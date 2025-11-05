import { Component, effect, Input, OnDestroy, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { ValidateErrorsInput } from "../../directives/validate-errors-input";
import { Register } from '../../pages/auth/register/register';

@Component({
  selector: 'app-input-upload-image',
  imports: [NgIcon, ValidateErrorsInput],
  templateUrl: './input-upload-image.html',
  styleUrl: './input-upload-image.css',
})
export class InputUploadImage implements OnDestroy{

  public avatarPreview = signal<string | null>(null);
  private _previewUrl: string | null = null;

  @Input() registerForm!: FormGroup;

  constructor(private register: Register) {
    effect(() => {
      if(this.register.resetImage()) this.removeAvatar();
    })
  }

  public onAvatarSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.registerForm.patchValue({ avatar: file });
    this.registerForm.get('avatar')?.markAsTouched();
    this.registerForm.get('avatar')?.updateValueAndValidity();

    if (this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
      this._previewUrl = null;
    }

    if(file) {
      this._previewUrl = URL.createObjectURL(file);
      this.avatarPreview.set(this._previewUrl);
    } else {
      this.avatarPreview.set(null);
    }
  }

  public removeAvatar(): void {
    this.registerForm.patchValue({ 'avatar': null });
    this.registerForm.get('avatar')?.updateValueAndValidity();

    if(this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
    }

    this.avatarPreview.set(null);
  }

  ngOnDestroy() {
    if (this._previewUrl) URL.revokeObjectURL(this._previewUrl);
  }

}
