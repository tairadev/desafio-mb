export default class ValidationHelper {
  /**
   * Funcao que verifica se email é valido
   *
   * @param {*} email Uma string com o email
   * @returns true ou false
   */
  static isEmailValid(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  /**
   * Funcao que verifica se telefone é valido
   *
   * @param {*} phone Uma string com o telefone
   * @returns true ou false
   */
  static isPhoneValid(phone) {
    return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone)
  }

  /**
   * Funcao que verifica se nome é valido
   *
   * @param {*} name Uma string com o nome
   * @returns true ou false
   */
  static isNameValid(name) {
    return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/.test(name);
  };

  /**
   * Funcao que verifica se documento é valido
   *
   * @param {*} name Uma string com o documento (CPF ou CNPJ)
   * @param {*} isPJ Um booleano que diz se é PJ ou não
   * @returns true ou false
   */
  static isDocumentValid(document, isPJ) {
    if(!isPJ) {
      let cpf = document.replace(/[^\d]/g, '');

      if (cpf.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(cpf)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);

      let firstVerifier = 11 - (sum % 11);
      if (firstVerifier > 9) firstVerifier = 0;

      if (parseInt(cpf.charAt(9)) !== firstVerifier) return false;

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);

      let secondVerifier = 11 - (sum % 11);
      if (secondVerifier > 9) secondVerifier = 0;

      if (parseInt(cpf.charAt(10)) !== secondVerifier) return false;

      return true;
    }

    let cnpj = document.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = (weight === 2) ? 9 : weight - 1;
    }

    let firstVerifier = 11 - (sum % 11);
    if (firstVerifier > 9) firstVerifier = 0;

    if (parseInt(cnpj.charAt(12)) !== firstVerifier) return false;

    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = (weight === 2) ? 9 : weight - 1;
    }
    let secondVerifier = 11 - (sum % 11);
    if (secondVerifier > 9) secondVerifier = 0;

    if (parseInt(cnpj.charAt(13)) !== secondVerifier) return false;

    return true;
  };

  /**
   * Funcao que verifica se data é valida
   *
   * @param {*} date Uma string com a data
   * @param {*} isPJ Um booleano que diz se é PJ ou não
   * @returns true ou false
   */
  static isDateValid(date, isPJ) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(date)) return false;

    const parts = date.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const today = new Date();

    if (isPJ) {
      const inputDate = new Date(year, month - 1, day);
      const oneDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.floor((today - inputDate) / oneDay);
      return diffDays > 1;
    } else {
      let age = today.getFullYear() - year;
      const monthDiff = today.getMonth() - (month - 1);
      const dayDiff = today.getDate() - day;

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;

      return age >= 18;
    }
  };
}
