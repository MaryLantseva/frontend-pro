export default class FormAddContactView {
  constructor() {
    this.select = this.initSelect();
    this.input = this.initInput();
    this.btnDeleteContact = this.initBtnDeleteContact();
    this.formAddContact = this.initFormAddContact();

    // подключение библиотеки Choices
    const Select = () => {
      new Choices(this.select, {
        searchEnabled: false
      });
    }

    Select();
  }

  // инициализация кнопки удалить контакт
  initBtnDeleteContact() {
    const btnDeleteContact = document.createElement('button');
    btnDeleteContact.classList.add('contact__btn', 'is-hidden', 'btn-reset');
    btnDeleteContact.innerHTML = `<svg class="contact__svg">
                                    <use xlink:href="#remove"></use>
                                  </svg>`;

    // const svg = document.createElement('svg');
    // svg.classList.add('contact__svg');

    // const use = document.createElement('use');
    // use.setAttribute('xlink:href', '#remove');

    // svg.append(use);
    // btnDeleteContact.append(svg);

    return btnDeleteContact;
  }

  // инициализация поля ввода контакта
  initInput() {
    const input = document.createElement('input');
    input.classList.add('contact__input');
    input.placeholder = 'Введите данные контакта';

    // при вводе контакта в инпут - появляется кнопка удаления контакта
    input.addEventListener('input', () => {
      if (input.value !== '') {
        this.btnDeleteContact.classList.remove('is-hidden');
      } else this.btnDeleteContact.classList.add('is-hidden');

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

    return select;
  }

  // инициализация всей формы добавления нового контакта
  initFormAddContact() {
    const formAddContact = document.createElement('li');
    formAddContact.classList.add('contact');
    formAddContact.append(this.select);
    formAddContact.append(this.input);
    formAddContact.append(this.btnDeleteContact)
    return formAddContact;
  }




}