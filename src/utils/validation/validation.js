class Validator {
  constructor() {}

  minLength(valueToValidate, minLength) {
    return valueToValidate.length >= minLength;
  }

  validatePassword(value) {
    const minPassLenght = 8;
    const maxPassLenght = 32;
    let isSymbolUsed = false;
    let isUpperCase = false;

    const symbols = ["@", "!", "?"];

    let errors = [];

    value.length < minPassLenght
      ? errors.push(`Minimum password length is ${minPassLenght}`)
      : null;
    value.length > maxPassLenght
      ? errors.push(`Maximum password length is ${maxPassLenght}`)
      : null;

    for (let index = 0; index < value.length; index++) {
      value[index] === value[index].toUpperCase() ? (isUpperCase = true) : null;

      symbols.includes(value[index]) ? (isSymbolUsed = true) : null;
    }

    isSymbolUsed ? null : errors.push("Use at least 1 symbol");
    isUpperCase ? null : errors.push("Use at least 1 char in upper case");
    return errors.length === 0 ? [] : errors;
  }

  isMatch(firstValue, secondValue) {
    return firstValue === secondValue;
  }

  isRequired(value) {
    return value.length <= 0;
  }
}

export default Validator;
