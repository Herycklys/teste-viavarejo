import { AbstractControl } from '@angular/forms';
import { UtilsService } from '../services/utils.service';

export function ValidCpf(control: AbstractControl) {
  if (control.value && !UtilsService.ValidateCPF(control.value)) {
    return { validcpf: true };
  }

  return null;
}
