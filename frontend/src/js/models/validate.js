export default class Validate {

  // проверка поля на наличие символов и цифр
  validateInputText(value) {
    const pattern = new RegExp(/[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    if (pattern.test(value)) {
      return {
        isValidate: false,
        descr: 'Не должно быть спецсимволов'
      };
    }
    const arrayValue = value.split('');
    for (let i = 0; i < arrayValue.length; i++) {

      if (!isNaN(Number(arrayValue[i]))) {
        return {
          isValidate: false,
          descr: 'Не должно быть чисел'
        }
      }
    }
    return {
      isValidate: true,
      descr: ''
    }
  }

  // валидация обязательных полей
  validateRequiredText(text) {
    const value = text.trim();
    if (value === '') {
      return {
        isValidate: false,
        descr: 'Это поле обязательно для заполнения'
      }
    } else if (value.length === 1) {
      return {
        isValidate: false,
        descr: 'Должно быть минимум 2 буквы'
      }
    }

    return this.validateInputText(value);
  }

  // валидация необязательных полей
  validateUnrequiredText(text) {
    const value = text.trim();
    if (value === '') {
      return {
        isValidate: true,
        descr: ''
      }
    }
    // если что-то было введено, то проводим валидацию текстового поля на символы, цифры...
    return this.validateInputText(value);
  }

  // валидация поля с номером телефона (т.к. включена маска, проверяем только на число цифр)
  validateTel(value) {
    if (value.length === 18) {
      return {
        isValidate: true,
        descr: ''
      }
    } else if (value === '') {
      return {
        isValidate: false,
        descr: 'Поле не должно быть пустым'
      }
    } else return {
      isValidate: false,
      descr: 'Должно быть 11 цифр'
    };
  }

  // валидация Email адреса
  validateEmail(text) {
    const value = text.trim();
    const pattern = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    if (pattern.test(value)) {
      return {
        isValidate: true,
        descr: ''
      }
    } else if (value === '') {
      return {
        isValidate: false,
        descr: 'Поле не должно быть пустым'
      }
    } else return {
      isValidate: false,
      descr: 'Email не валидный'
    }
  }

  // валидация адреса Vk
  validateVk(text) {
    const value = text.trim();
    let pattern = new RegExp(/https?:\/\/(www\.)?vk\.com\/(?:id)?(-?\w+)/);
    if (pattern.test(value)) {
      return {
        isValidate: true,
        descr: ''
      }
    } else if (value === '') {
      return {
        isValidate: false,
        descr: 'Поле не должно быть пустым'
      }
    } else
      return {
        isValidate: false,
        descr: 'Vk адрес не валидный'
      }
  }

  // валидация адреса Fb
  validateFb(text) {
    const value = text.trim();
    let pattern = new RegExp(/https?:\/\/(www\.)?facebook\.com\/(?:id)?(-?\w+)/);
    if (pattern.test(value)) {
      return {
        isValidate: true,
        descr: ''
      }
    } else if (value === '') {
      return {
        isValidate: false,
        descr: 'Поле не должно быть пустым'
      }
    } else
      return {
        isValidate: false,
        descr: 'Facebook адрес не валидный'
      }
  }

  // валидация поля доп телефон
  validateOther(text) {
    const value = text.trim();
    if (value === '') {
      return {
        isValidate: false,
        descr: 'Поле не должно быть пустым'
      }
    } else {
      return {
        isValidate: true,
        descr: ''
      }
    }
  }
}