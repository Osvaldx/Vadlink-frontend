import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateMatchPasswords(passControl: string, repeatPControl: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get(passControl)?.value;
        const repeatPassword = formGroup.get(repeatPControl)?.value;

        if(password === '' || repeatPassword === '') return { passwordMisMatch: true };

        const match = (password === repeatPassword);

        return match ? null : { passwordMisMatch: true };
    }
}