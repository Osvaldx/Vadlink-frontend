import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateInvalidChars(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const username: string = control.value;

        if(!username) return null;

        const invalidCharRegex = /[ !"#$%&'()/:;<=>?@\]^`{|}~]/;

        return invalidCharRegex.test(username) ? { invalidChar: true } : null;
    }
}