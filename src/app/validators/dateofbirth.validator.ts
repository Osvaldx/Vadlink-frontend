import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateDateOfBirth(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const dateInput = control.value;
        const [year, month, day] = (String (dateInput)).split('-').map(Number);
        const dateofbirh = new Date(year, month-1, day);
        
        const datenow = new Date();
        const isFuture = dateofbirh > datenow;
        const isOld = ((datenow.getFullYear() - year) > 120);
        const isYoung = ((datenow.getFullYear() - year) < 5);

        if(isFuture || isOld || isYoung) {
            return { validateDateOfBirth: { isFuture, isOld, isYoung } }
        }

        return null;
    }
}