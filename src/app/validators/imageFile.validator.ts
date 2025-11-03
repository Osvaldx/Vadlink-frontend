import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateImageFile(opts: { maxSizeMB: number, allowedTypes: string[] }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value as File | null;
        if(!file) return null;

        const tooBig = file.size > opts.maxSizeMB * 1024 * 1024
        console.log(file.type);
        const badType = !opts.allowedTypes.includes(file.type);

        return (tooBig || badType) ? { InvalidImage: { tooBig, badType, requiredSize: opts.maxSizeMB, availableTypes: opts.allowedTypes.map(e => e.replace('image/', '')) } } : null;
    }
}