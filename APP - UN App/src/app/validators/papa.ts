import { FormControl } from '@angular/forms';

export class PAPAValidator {

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

        if (control.value > 5){
            return {
                "¿Qué más quieres de mí?": true
            };
        }

        return null;
    }

}