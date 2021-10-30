import FormAddContactView from "./formAddContactView";
import LogicalPath from "./logicalPath";
import Validate from "./validate";

export default class FormView {
  constructor(formDeleteView, tableView) {
    this.tableView = tableView;
    this.initForma = this.initForm()
    this.form = this.initForma.form;
    this.formContainer = this.initForma.formContainer;
    this.formTitle = document.querySelector('.form-interaction__title');
    this.formId = document.querySelector('.form__id');

    this.inputSurname = this.initInputSurname();
    this.inputSurnameError = this.initInputSurnameError();
    this.inputName = this.initInputName();
    this.inputNameError = this.initInputNameError();
    this.inputLastname = this.initInputLastname();
    this.inputLastnameError = this.initInputLastnameError();

    this.formAddContactContainer = document.querySelector('.form__add-contact');
    this.fieldContacts = this.initFieldContacts();
    this.btnAddContact = this.initBtnAddContact();
    this.listFormAddContacts = [];
    this.initBtnCross();

    this.btnSaveClient = this.initBtnSaveClient();
    this.btnCancel = this.initBtnCancel();
    this.btnDelete = this.initBtnDelete();
    this.formDeleteView = formDeleteView;
    this.validate = new Validate();
    this.logicalPath = new LogicalPath();
    this.heightForm = this.formContainer.clientHeight;
  }

  // инициализация поля ввода для имени
  initInputName(name = '') {
    return this.initInput('.form__name', name);
  }

  // инициализация поля ввода для фамилии
  initInputSurname(surname = '') {
    return this.initInput('.form__surname', surname);
  }

  // инициализация поля ввода для отчества
  initInputLastname(lastName = '') {
    return this.initInput('.form__lastname', lastName);
  }

  // инициализация ошибки для поля с фамилией 
  initInputSurnameError() {
    const inputSurnameError = document.getElementById('error-1');

    return inputSurnameError;
  }

  // инициализация ошибки для поля с именем 
  initInputNameError() {
    const inputNameError = document.getElementById('error-2');

    return inputNameError;
  }

  // инициализация ошибки для поля с отчеством
  initInputLastnameError() {
    const inputLastnameError = document.getElementById('error-3');

    return inputLastnameError;
  }

  // инициализация полей ввода
  initInput(selector, content) {
    const input = document.querySelector(selector);
    const idInput = input.getAttribute('id');
    const labelInput = this.initLabelForInputs(idInput);

    input.value = content;
    if (input.value !== '') {
      labelInput.classList.add('form__label--input');
    }

    input.addEventListener('input', () => {
      if (input.value !== '') {
        labelInput.classList.add('form__label--input');
      } else labelInput.classList.remove('form__label--input');
    })

    return input;
  }

  // инициализация label 
  initLabelForInputs(id) {
    const label = document.querySelector(`[for="${id}"]`);
    return label;
  }

  // инициализация формы
  initForm() {
    const form = document.querySelector('.form-interaction');
    const formContainer = document.querySelector('.form-interaction__container');

    // закрыть форму при клике мимо формы
    form.addEventListener('click', (e) => {
      if (this.listenerDeleteContact(e)) {
        return;
      }
      if (!formContainer.contains(e.target)) {
        form.classList.add('form--hidden');
        this.clearInputs();
      }
    })

    return {
      form,
      formContainer
    }
  }

  // появление формы 
  formVisible(title, client) {
    this.formTitle.textContent = title;
    if (client.id === '') {
      this.formId.classList.add('is-hidden');
      this.formContainer.append(this.btnCancel);
    } else {
      this.formId.classList.remove('is-hidden');
      this.formContainer.append(this.btnDelete);
      this.logicalPath.getClient(client.id).then(res => {
        this.client = res;
        this.formId.textContent = `ID: ${res.id}`;
        this.inputName.value = res.name;
        this.inputSurname.value = res.surname;
        this.inputLastname.value = res.lastName;
        const inputs = document.querySelectorAll('.form__input');
        const labels = document.querySelectorAll('.form__label');
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].value !== '') {
            labels[i].classList.add('form__label--input');
          }
        }
        if (res.contacts.length > 0) {
          this.formAddContactContainer.classList.add('form__add-contact--active');
          this.fieldContacts.classList.add('form__list-contacts--active');
        }

        if (res.contacts.length >= 10) {
          this.formContainer.classList.add('form__container--more-contacts');
        }
        for (let i = 0; i < res.contacts.length; i++) {
          this.appendNewContact(res.contacts[i]);
        }
      });
    }

    this.form.classList.remove('form--hidden');
  }

  // инициализация кнопок для закрытия формы
  initBtnCross() {
    const btnCross = document.querySelector('.form-interaction__btn');

    btnCross.addEventListener('click', (e) => {
      e.preventDefault();
      this.formHidden();
    })
  }

  initBtnCancel() {
    const button = document.createElement('button');
    button.classList.add('form__cancel', 'btn-reset');
    button.textContent = 'Отмена';

    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.formHidden();
    })

    return button;
  }

  initBtnDelete() {
    const button = document.createElement('button');
    button.classList.add('form__cancel', 'btn-reset');
    button.textContent = 'Удалить клиента';

    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.formDeleteView.formVisible(this.client.id, this);
    })

    return button;
  }

  // инициализация кнопки для добавления нового контакта клиента
  initBtnAddContact() {
    const btnAddContact = document.querySelector('.form__btn-add');

    btnAddContact.addEventListener('click', (e) => {
      e.preventDefault();
      this.formAddContactContainer.classList.add('form__add-contact--active');
      this.fieldContacts.classList.add('form__list-contacts--active');
      this.appendNewContact({ type: 'Телефон', value: '' });
      if (this.clientHeight >= window.innerHeight) {
        this.formContainer.classList.add('form__container--more-contacts');
      }
    })

    return btnAddContact;
  }

  // инициализация кнопки добавления клиента
  initBtnSaveClient() {
    const btnSaveClient = document.querySelector('.form-interaction__save');
    this.errorMessage = document.querySelector('.form__error-message');

    btnSaveClient.addEventListener('click', (e) => {
      e.preventDefault();
      const validName = this.validateText(this.inputName, true, this.inputNameError);
      const validSurname = this.validateText(this.inputSurname, true, this.inputSurnameError);
      const validLastname = this.validateText(this.inputLastname, false, this.inputLastnameError);

      let isValid = true;
      const arrayContacts = [];
      for (const contact of this.listFormAddContacts) {
        const validContact = this.validateContact(contact.input, contact.fieldError, contact.choice.getValue(true));
        arrayContacts.push({ type: contact.choice.getValue(true), value: contact.input.value });

        if (!validContact) {
          isValid = false;
        }
      }

      // если все поля прошли валидацию => отправка запроса на сервер
      if (validName && validSurname && validLastname && isValid && this.formId.textContent === '') {
        const client = {
          name: this.inputName.value,
          surname: this.inputSurname.value,
          lastname: this.inputLastname.value,
          contacts: arrayContacts
        }

        this.logicalPath.postNewClient(client)
          .then((res) => {
            if (res.ok) {
              this.tableView.refresherTable();
              this.formHidden();
            } else {
              if (res.statusText !== '') {
                throw new Error(res.statusText);
              } else throw new Error('Что-то пошло не так...');
            }
          })
          .catch(error => {
            this.errorMessage.textContent = error;
          });
      } else if (validName && validSurname && validLastname && isValid && this.formId.textContent !== '') {


        const clientForSend = {};
        if (this.client.name !== this.inputName.value) {
          clientForSend.name = this.inputName.value;
        }
        if (this.client.surname !== this.inputSurname.value) {
          clientForSend.surname = this.inputSurname.value;
        }
        if (this.client.lastName !== this.inputLastname.value) {
          clientForSend.lastName = this.inputLastname.value;
        }

        const oldContacts = [];
        for (const contact of this.listFormAddContacts) {
          oldContacts.push({ type: contact.choice.getValue(true), value: contact.input.value })
        }

        if (oldContacts.length === this.client.contacts.length) {
          for (let i = 0; i < oldContacts.length; i++) {
            if (oldContacts[i].type !== this.client.contacts[i].type || oldContacts[i].value !== this.client.contacts[i].value) {
              clientForSend.contacts = oldContacts;
              break;
            }
          }
        } else {
          clientForSend.contacts = oldContacts;
        }

        this.logicalPath.patchClient(this.client.id, clientForSend)
          .then((res) => {
            if (res.ok) {
              this.tableView.refresherTable();
              this.formHidden();
            } else {
              if (res.statusText !== '') {
                throw new Error(res.statusText);
              } else throw new Error('Что-то пошло не так...');
            }
          })
          .catch(error => {
            this.errorMessage.textContent = error;
          });
      }
    })
    return btnSaveClient;
  }

  // проверка валидации поля
  validateText(input, isRequired, fieldError) {
    if (isRequired) {
      const valid = this.validate.validateRequiredText(input.value);
      if (valid.isValidate) {
        input.classList.add('form__input--success');
        input.classList.remove('form__input--error');
        fieldError.textContent = '';
        return true;
      } else {
        input.classList.add('form__input--error');
        input.classList.remove('form__input--success');
        fieldError.textContent = valid.descr;
        return false;
      }
    } else {
      const valid = this.validate.validateUnrequiredText(input.value)
      if (valid.isValidate) {
        input.classList.add('form__input--success');
        input.classList.remove('form__input--error');
        fieldError.textContent = '';
        return true;
      } else {
        input.classList.add('form__input--error');
        input.classList.remove('form__input--success');
        fieldError.textContent = valid.descr;
        return false;
      }
    }
  }

  // проверка валидации в форме контактов
  validateContact(input, fieldError, selectValue) {
    if (selectValue === 'Телефон') {
      return this.validateContactText(input, this.validate.validateTel(input.value), fieldError);
    } else if (selectValue === 'Email') {
      return this.validateContactText(input, this.validate.validateEmail(input.value), fieldError);
    } else if (selectValue === 'Facebook') {
      return this.validateContactText(input, this.validate.validateFb(input.value), fieldError);
    } else if (selectValue === 'Vk') {
      return this.validateContactText(input, this.validate.validateVk(input.value), fieldError);
    } else {
      return this.validateContactText(input, this.validate.validateOther(input.value), fieldError);
    }
  }

  // навешиваем стили на поле ввода контактов после валидации
  validateContactText(input, validateMethod, fieldError) {
    if (validateMethod.isValidate) {
      input.classList.add('contact__input--success');
      input.classList.remove('contact__input--error');
      fieldError.textContent = '';
      return true;
    } else {
      input.classList.add('contact__input--error');
      input.classList.remove('contact__input--success');
      fieldError.textContent = validateMethod.descr;
      return false;
    }
  }

  // добавление нового контакта
  appendNewContact(contact) {
    const newContact = new FormAddContactView(contact);
    this.listFormAddContacts.push(newContact);
    if (this.listFormAddContacts.length >= 10) {
      this.btnAddContact.classList.add('form__btn-add--hidden');
    }
    this.fieldContacts.append(newContact.formAddContact);
  }

  // инициализация поля с контактами клиента
  initFieldContacts() {
    const fieldContacts = document.querySelector('.form__list-contacts');
    return fieldContacts;
  }

  // проверка, удалился контакт или нет
  listenerDeleteContact(e) {
    for (const contact of this.listFormAddContacts) {

      if (contact.btnDeleteContact.contains(e.target)) {
        const index = this.listFormAddContacts.indexOf(contact);
        this.listFormAddContacts.splice(index, 1);
        contact.removeForm();

        if (this.listFormAddContacts.length < 10) {
          this.btnAddContact.classList.remove('form__btn-add--hidden');
        }

        if (this.clientHeight >= window.innerHeight) {
          this.formContainer.classList.remove('form__container--more-contacts');
        }

        if (this.listFormAddContacts.length === 0) {
          this.formAddContactContainer.classList.remove('form__add-contact--active');
          this.fieldContacts.classList.remove('form__list-contacts--active');
        }

        return true;
      }
    }
    return false;
  }

  // очистка всех полей и контактов формы
  clearInputs() {
    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('form__input--success');
      input.classList.remove('form__input--error');
    })
    const labels = document.querySelectorAll('.form__label');
    labels.forEach(label => {
      label.classList.remove('form__label--input');
    })

    const inputErrors = document.querySelectorAll('.form__text-error');
    inputErrors.forEach(inputError => {
      inputError.textContent = '';
    })

    for (const contact of this.listFormAddContacts) {
      contact.removeForm();
    }
    this.listFormAddContacts = [];
    if (this.formAddContactContainer !== undefined) {
      this.formAddContactContainer.classList.remove('form__add-contact--active');
    }
    this.fieldContacts.classList.remove('form__list-contacts--active');
    this.formContainer.classList.remove('form__container--more-contacts');
    this.btnAddContact.classList.remove('form__btn-add--hidden');
    this.errorMessage.textContent = '';
    if (this.formContainer.contains(this.btnDelete)) {
      this.btnDelete.remove();
    } else {
      this.btnCancel.remove();
    }
  }

  formHidden() {
    this.form.classList.add('form--hidden');
    this.clearInputs();
  }
}
