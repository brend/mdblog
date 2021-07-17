import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appFilenamevalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: FilenamevalidatorDirective,
      multi: true
    }
  ]
})
export class FilenamevalidatorDirective implements Validator {

  validator: ValidatorFn;
 
  constructor() {
    this.validator = this.emailValidator();
  }

  validate(c: FormControl) {
      console.log('its happending');
    return this.validator(c);
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return this.isValid(control.value) ? null : {forbiddenTitle: {value: control.value}};
      };
  }

  isValid(filename: string): boolean {
    var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2=/^\./; // cannot start with dot (.)
    var rg3=/^(nul|aux|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    
    return rg1.test(filename)&&!rg2.test(filename)&&!rg3.test(filename);
  }
}