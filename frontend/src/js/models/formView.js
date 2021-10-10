import FormAddContactView from "./formAddContactView";

export default class FormView {
  constructor() {
    this.form = this.initForm();
    this.initBtnsCansel();
    this.initBtnAddContact();
    this.fieldContacts = this.initFieldContacts();
  }

  // инициализация формы
  initForm() {
    const form = document.querySelector('.form');
    const formContainer = document.querySelector('.form__container');

    // закрыть форму при клике мимо формы
    form.addEventListener('click', (e) => {
      if (!formContainer.contains(e.target)) {
        form.classList.add('form--hidden');
      }
    })

    return form;
  }

  // инициализация кнопок для закрытия формы
  initBtnsCansel() {
    const btnCansel = document.querySelector('.form__cansel');
    const btnExit = document.querySelector('.form__btn');

    btnCansel.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.add('form--hidden');
    })

    btnExit.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.add('form--hidden');
    })
  }

  // инициализация кнопки для добавления нового контакта клиента
  initBtnAddContact() {
    const btnAddContact = document.querySelector('.form__btn-add');

    btnAddContact.addEventListener('click', (e) => {
      e.preventDefault();
      const formAddContactContainer = document.querySelector('.form__add-contact');
      formAddContactContainer.classList.add('form__add-contact--active');
      this.fieldContacts.classList.add('form__list-contacts--active');
      this.fieldContacts.append(new FormAddContactView().formAddContact);
    })
  }

  // инициализация поля с контактами клиента
  initFieldContacts() {
    const fieldContacts = document.querySelector('.form__list-contacts');
    return fieldContacts;
  }
}
