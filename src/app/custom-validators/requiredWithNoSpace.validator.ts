import { AbstractControl } from '@angular/forms';

export function ValidRequiredNoSpace(control: AbstractControl) {
  if (!control.value || (control.value && !`${control.value}`.trim())) {
    return { validrequirednospace: true };
  }

  return null;
}
