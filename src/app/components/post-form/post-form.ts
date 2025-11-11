import { Component, Input, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateImageFile } from '../../validators/imageFile.validator';
import { NgIcon } from "@ng-icons/core";
import { UserData } from '../../interfaces/user-data';
import { ValidateErrorsInput } from '../../directives/validate-errors-input';
import { PostsService } from '../../services/posts-service';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, NgIcon, ValidateErrorsInput],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm implements OnDestroy{

  @Input() user!: UserData;

  public imagePreview = signal<string | null>(null);
  private _previewUrl: string | null = null;

  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.minLength(1), Validators.maxLength(2000)]),
    image: new FormControl<File | null>(null, [ValidateImageFile({ maxSizeMB: 2, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] })])
  })

  constructor(private readonly postService: PostsService) { }

  public isDisabled(): boolean {
    const form = this.postForm;
    const control = form.controls;

    const hasTitleError = (control.title.errors) ? true : false;
    const hasDescriptionError = (control.description.errors) ? true : false;
    const hasImageError = (control.image.errors) ? true : false;

    const retorno = (hasTitleError || hasDescriptionError || hasImageError);

    return retorno;
  }

  public sendDataPost() {
    if(this.postForm.errors) return;

    const control = this.postForm.controls;

    const formData = new FormData();
    formData.append('title', control.title.value!)
    
    if(control.description.value) formData.append('description', control.description.value);
    if(control.image.value) formData.append('file', control.image.value);

    this.postService.createPost(formData);

    this.postForm.reset();
    this.removeImage();
  }

  public removeImage() {
    this.postForm.patchValue({ 'image': null });
    this.postForm.get('image')?.updateValueAndValidity();

    if(this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
    }

    this.imagePreview.set(null);
  }

  public onimageSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.postForm.patchValue({ image: file });
    this.postForm.get('image')?.markAsTouched();
    this.postForm.get('image')?.updateValueAndValidity();

    if (this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
      this._previewUrl = null;
    }

    if(file) {
      this._previewUrl = URL.createObjectURL(file);
      this.imagePreview.set(this._previewUrl);
    } else {
      this.imagePreview.set(null);
    }
  }

  ngOnDestroy() {
    if (this._previewUrl) URL.revokeObjectURL(this._previewUrl);
  }

}
