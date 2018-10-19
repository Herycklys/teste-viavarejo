import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static ValidateCPF(strCpf: string): boolean {

    let soma;
    let resto;
    soma = 0;

    if (strCpf == "00000000000") {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
}
