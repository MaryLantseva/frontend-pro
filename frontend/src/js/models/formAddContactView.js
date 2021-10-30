export default class FormAddContactView {
  constructor(contact) {
    this.select = this.initSelect();
    this.btnDeleteContact = this.initBtnDeleteContact();
    this.input = this.initInput(contact, this.btnDeleteContact);
    this.fieldError = this.initError();
    this.label = this.initLabel();
    this.formAddContact = this.initFormAddContact();

    this.label.append(this.input);
    this.label.append(this.fieldError);
    this.formAddContact.append(this.select);
    this.formAddContact.append(this.label);
    this.formAddContact.append(this.btnDeleteContact);

    // подключение библиотеки Choices
    this.choice = new Choices(this.select, {
      searchEnabled: false,
    });
    this.choice.setChoiceByValue(contact.type);
  }

  // инициализация кнопки удалить контакт (с тултипом)
  initBtnDeleteContact() {
    const divDeleteContact = document.createElement('div');
    divDeleteContact.classList.add('contact__btn', 'contact__tooltip', 'is-hidden');
    const btnDeleteContact = document.createElement('button');
    btnDeleteContact.classList.add('contact__marker', 'btn-reset');
    btnDeleteContact.innerHTML = `<svg class="contact__svg">
                                    <use xlink:href="#remove"></use>
                                  </svg>`;

    const popup = document.createElement('div');
    popup.classList.add('contact__popup');
    popup.textContent = 'Удалить контакт';

    divDeleteContact.append(btnDeleteContact);
    divDeleteContact.append(popup);

    return divDeleteContact;
  }

  // инициализация label
  initLabel() {
    const label = document.createElement('label');
    label.classList.add('contact__label');

    return label;
  }

  // инициализация поля с ошибкой
  initError() {
    const fieldError = document.createElement('span');
    fieldError.classList.add('contact__text-error');

    return fieldError;
  }

  // инициализация поля ввода контакта
  initInput(contact, btnDeleteContact) {
    const input = document.createElement('input');
    input.classList.add('contact__input');
    input.placeholder = 'Введите данные контакта';
    if (contact.type === 'Телефон') {
      this.inputMaskTel(input);
    }

    input.value = contact.value;

    if (input.value !== '') {
      btnDeleteContact.classList.remove('is-hidden');
    }
    // при вводе контакта в инпут - появляется кнопка удаления контакта
    input.addEventListener('input', () => {
      if (input.value !== '') {
        btnDeleteContact.classList.remove('is-hidden');
      } else btnDeleteContact.classList.add('is-hidden');
    })

    return input;
  }

  // создание option для селекта с определенным value
  initOptionForSelect(value) {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.value = value;

    return option;
  }

  // инициализация селекта
  initSelect() {
    const select = document.createElement('select');
    select.classList.add('select');
    select.setAttribute('name', 'select');

    select.append(this.initOptionForSelect('Телефон'));
    select.append(this.initOptionForSelect('Facebook'));
    select.append(this.initOptionForSelect('Vk'));
    select.append(this.initOptionForSelect('Email'));
    select.append(this.initOptionForSelect('Доп. телефон'));

    select.addEventListener('change', () => {
      this.mask.destroy();
      if (this.choice.getValue(true) === 'Телефон') {
        this.inputMaskTel(this.input);
      }
      this.input.value = '';
      this.btnDeleteContact.classList.add('is-hidden');
      this.input.classList.remove('contact__input--success');
      this.input.classList.remove('contact__input--error');
      this.fieldError.textContent = '';
    })

    return select;
  }

  // инициализация всей формы добавления нового контакта
  initFormAddContact() {
    const formAddContact = document.createElement('li');
    formAddContact.classList.add('contact');

    return formAddContact;
  }

  // удаление формы
  removeForm() {
    this.formAddContact.remove();
  }

  // маска для номера телефона
  inputMaskTel(input) {
    let maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };
    this.mask = IMask(input, maskOptions);
  }


}