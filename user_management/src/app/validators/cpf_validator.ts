import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalid: 'CPF inválido' };
  }

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
  if (firstDigit !== parseInt(cpf.charAt(9))) {
    return { cpfInvalid: 'CPF inválido' };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
  if (secondDigit !== parseInt(cpf.charAt(10))) {
    return { cpfInvalid: 'CPF inválido' };
  }

  return null; // CPF válido
}