import LogicalPath from "./logicalPath";

export default class FormDeleteView {
  constructor(tableView) {
    this.form = this.initFormDelete();
    this.formContainer = this.initFormContainer();
    this.btnCross = this.initBtnCross();
    this.btnCancel = this.initBtnCancel();
    this.btnDelete = this.initBtnDelete();
    this.logicalPath = new LogicalPath();
    this.tableView = tableView;
  }

  // инициализация формы для удаления клиента
  initFormDelete() {
    const form = document.querySelector('.form-delete');
    // закрыть форму при клике мимо
    form.addEventListener('click', (e) => {
      if (!this.formContainer.contains(e.target)) {
        this.form.classList.add('form--hidden');
      }
    })

    return form;
  }

  // инициализация контейнера формы
  initFormContainer() {
    const formContainer = document.querySelector('.form-delete__container');

    return formContainer;
  }

  // появление формы
  formVisible(id, formView = null) {
    this.form.classList.remove('form--hidden');
    this.id = id;
    this.formView = formView;
  }

  // инициализация кнопки удаления клиента
  initBtnDelete() {
    const btnDelete = document.querySelector('.form-delete__save');

    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      this.logicalPath.deleteClient(this.id).then(() => {
        if (this.formView !== null) {
          this.formView.formHidden();
        }
        this.form.classList.add('form--hidden');
        this.tableView.refresherTable();
      })
    })

    return btnDelete;
  }

  // инициализация кнопки закрытия формы (крестик)
  initBtnCross() {
    const btnCross = document.querySelector('.form-delete__btn');
    btnCross.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.add('form--hidden');
    })

    return btnCross;
  }

  // инициализация кнопки отмены удаления клиента
  initBtnCancel() {
    const btnCancel = document.querySelector('.form-delete__cancel');

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.add('form--hidden');
    })
    return btnCancel;
  }
}