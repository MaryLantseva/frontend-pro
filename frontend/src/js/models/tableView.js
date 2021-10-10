import FormView from "./formView";

export default class TableView {
  constructor() {
    this.form = new FormView()
    this.btnAddClient = this.initBtnAddClient();
  }

  initBtnAddClient() {
    const btnAddClient = document.querySelector('.main__btn');

    btnAddClient.addEventListener('click', ()=> {
      this.form.form.classList.remove('form--hidden');
    })

    return btnAddClient;
  }
}
