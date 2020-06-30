import { FormControl } from '@angular/forms';

export class AvanceValidator {

    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        if(control.value < 0){
            return {
                "Imposible": true
            };
        }

        if (control.value > 100){
            return {
                "¿Qué más quieres de mí?": true
            };
        }

        return null;
    }

}