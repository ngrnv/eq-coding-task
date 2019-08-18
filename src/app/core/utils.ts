import { FormArray, FormControl, FormGroup } from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls)
    .forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        (control as FormArray).controls.forEach(ctrl => validateAllFormFields(ctrl as any));
      }
    });
}
