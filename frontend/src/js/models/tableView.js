import Filter from "./filter";
import FormDeleteView from "./formDeleteView";
import FormView from "./formView";
import LogicalPath from "./logicalPath";
import Sort from "./sort";
import TableRowView from "./tableRowView";

export default class TableView {
  constructor() {
    this.filterTimeout = null;
    this.filterValue = null;
    this.inputForFilter = this.initInput();
    this.arrayClients = [];
    this.logicalPath = new LogicalPath();
    this.table = this.initTable();
    this.formDeleteView = new FormDeleteView(this);
    this.form = new FormView(this.formDeleteView, this);
    this.sort = new Sort();
    this.filter = new Filter();
    this.initSortRows();
    this.isSorted = 'byId';

    this.btnAddClient = this.initBtnAddClient();
  }

  // инициализация кнопки добавить клиента 
  initBtnAddClient() {
    const btnAddClient = document.querySelector('.main__btn');

    btnAddClient.addEventListener('click', () => {
      this.form.formVisible('Новый клиент', {
        contacts: [],
        createdAt: "",
        id: "",
        lastName: "",
        name: "",
        surname: "",
        updatedAt: ""
      });
    })

    return btnAddClient;
  }

  // инициализация инпута для фильтрации
  initInput() {
    const inputForFilter = document.querySelector('.header__input');

    inputForFilter.addEventListener('input', () => {
      if (this.filterTimeout !== null) {
        clearTimeout(this.filterTimeout);
      }
      if (inputForFilter.value === '') {
        this.filterValue = null;
      } else this.filterValue = inputForFilter.value.trim();

      if (this.filterValue !== '') {
        this.filterTimeout = setTimeout(this.asyncRefresher, 300, this);
      }
    })

    return inputForFilter;
  }

  asyncRefresher(obj) {
    obj.refresherTable();
  }

  // инициализация таблицы 
  initTable() {
    const table = document.getElementById('table');

    this.addAllClients(table);
    return table;
  }

  // добавление всех клиентов в таблицу 
  addAllClients(table) {
    for (const client of this.arrayClients) {
      client.deleteContact();
    }


    this.arrayClients = [];
    this.logicalPath.getAllClients()
      .then(listClients => {
        let sortedListClients = this.sorting(listClients);
        if (this.filterValue !== null) {
          if (!isNaN(Number(this.filterValue))) {
            sortedListClients = this.filter.filterById(this.filterValue, sortedListClients);
          } else sortedListClients = this.filter.filterByFullName(this.filterValue, sortedListClients);
        }

        for (const client of sortedListClients) {
          const tableRow = new TableRowView(client, this.form, this.formDeleteView);
          this.arrayClients.push(tableRow);
          table.append(tableRow.tableRow);
        }
      })
  }

  // перерисовка таблицы
  refresherTable() {
    this.addAllClients(this.table);
  }

  sorting(listClients) {
    if (this.isSorted === 'byId') {
      return this.sort.sortingById(listClients);
    } else if (this.isSorted === 'byFullName') {
      return this.sort.sortingByFullName(listClients);
    } else if (this.isSorted === 'byDateAdd') {
      return this.sort.sortingByDateAdd(listClients);
    } else if (this.isSorted === 'byDateChange') {
      return this.sort.sortingByDateChange(listClients);
    } else if (this.isSorted === 'byIdDesc') {
      return this.sort.sortingByIdDesc(listClients);
    } else if (this.isSorted === 'byFullNameDesc') {
      return this.sort.sortingByFullNameDesc(listClients);
    } else if (this.isSorted === 'byDateAddDesc') {
      return this.sort.sortingByDateAddDesc(listClients);
    } else if (this.isSorted === 'byDateChangeDesc') {
      return this.sort.sortingByDateChangeDesc(listClients);
    }
  }

  initSortRows() {
    const btns = document.querySelectorAll('.table__btn-sort');
    const arrows = document.querySelectorAll('.table__arrow');
    const btnTexts = document.querySelectorAll('.table__text');

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (index === 0) {
          this.isSorted = 'byId'
        } else if (index === 1) {
          this.isSorted = 'byFullName'
        } else if (index === 2) {
          this.isSorted = 'byDateAdd'
        } else if (index === 3) {
          this.isSorted = 'byDateChange'
        }

        if (!arrows[index].classList.contains('table__arrow-rotate')) {
          arrows[index].classList.add('table__arrow-rotate');
          if (index === 0) {
            this.isSorted = 'byIdDesc';
          } else if (index === 1) {
            this.isSorted = 'byFullNameDesc';
          } else if (index === 2) {
            this.isSorted = 'byDateAddDesc';
          } else if (index === 3) {
            this.isSorted = 'byDateChangeDesc';
          }
        } else {
          arrows.forEach(arrow => {
            arrow.classList.add('table__arrow-rotate');
          })
          if (arrows[index].classList.contains('table__arrow-rotate')) {
            arrows[index].classList.remove('table__arrow-rotate');
          }
        }
        btnTexts.forEach(btnText => {
          btnText.classList.remove('table__text--active');
        })
        btnTexts[index].classList.add('table__text--active');
        this.refresherTable();

      })
    })
  }
}
