export default class TableRowView {
  constructor(client, form, formDeleteView) {
    this.form = form;
    this.tableRow = this.initTableRow(client);
    this.formDeleteView = formDeleteView;
  }

  // создание строки в таблице
  initTableRow(client) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('table__row');

    tableRow.append(this.initTableCellId(client));
    tableRow.append(this.initTableCellFullname(client));
    tableRow.append(this.initTableCellDateAdd(client));
    tableRow.append(this.initTableCellDateChange(client));
    tableRow.append(this.initTableCellContact(client));
    tableRow.append(this.initTableCellBtns(client));

    return tableRow;
  }

  // создание ячейки в таблице
  initTableCell() {
    const tableCell = document.createElement('td');
    tableCell.classList.add('table__row-item');

    return tableCell;
  }

  // ячейка с ID
  initTableCellId(client) {
    const tableCellId = this.initTableCell();
    tableCellId.classList.add('table__id');
    tableCellId.textContent = client.id;

    return tableCellId;
  }

  // ячейка с ФИО
  initTableCellFullname(client) {
    const tableCellFullname = this.initTableCell();
    tableCellFullname.classList.add('table__full-name');
    tableCellFullname.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    return tableCellFullname;
  }

  // ячейка с датой добавления
  initTableCellDateAdd(client) {
    const tableCellDateAdd = this.initTableCell();
    const spanDate = document.createElement('span');
    spanDate.classList.add('table__date');
    const dateAdd = this.changeDate(client.createdAt);
    spanDate.textContent = dateAdd;
    const spanTime = document.createElement('span');
    spanTime.classList.add('table__time');
    const timeAdd = this.changeTime(client.createdAt);
    spanTime.textContent = timeAdd;

    tableCellDateAdd.append(spanDate);
    tableCellDateAdd.append(spanTime);

    return tableCellDateAdd;
  }

  // ячейка с датой изменения
  initTableCellDateChange(client) {
    const tableCellDateChange = this.initTableCell();
    const spanDate = document.createElement('span');
    spanDate.classList.add('table__date');
    const dateUpdate = this.changeDate(client.updatedAt);
    spanDate.textContent = dateUpdate;
    const spanTime = document.createElement('span');
    spanTime.classList.add('table__time');
    const timeUpdate = this.changeTime(client.updatedAt);
    spanTime.textContent = timeUpdate;

    tableCellDateChange.append(spanDate)
    tableCellDateChange.append(spanTime);

    return tableCellDateChange;
  }

  // ячейка с контактами
  initTableCellContact(client) {
    const tableCellContact = this.initTableCell();
    const contactContainer = document.createElement('div');
    contactContainer.classList.add('table__contact');
    const arrayContacts = [];
    for (const contact of client.contacts) {
      arrayContacts.push(contact);
    }
    const numberHiddenContacts = arrayContacts.length - 4;
    if (arrayContacts.length > 5) {
      for (let i = 0; i < 4; i++) {
        const changingContact = this.createTooltip(arrayContacts[i]);
        contactContainer.append(changingContact);
      }
      const tooltip = this.svgEmpty(numberHiddenContacts);
      contactContainer.append(tooltip);
      tooltip.addEventListener('click', () => {
        tooltip.remove();
        for (let i = 4; i < arrayContacts.length; i++) {
          const changingContact = this.createTooltip(arrayContacts[i]);
          contactContainer.append(changingContact);
        }
      })
    } else {
      for (let i = 0; i < arrayContacts.length; i++) {
        const changingContact = this.createTooltip(arrayContacts[i]);
        contactContainer.append(changingContact);
      }
    }
    tableCellContact.append(contactContainer);
    return tableCellContact;
  }

  // ячейка с кнопками 
  initTableCellBtns(client) {
    const tableCellBtns = this.initTableCell();
    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('table__btns');
    btnsContainer.append(this.initTableCellBtnChange(client));
    btnsContainer.append(this.initTableCellBtnDelete(client));
    tableCellBtns.append(btnsContainer);

    return tableCellBtns;
  }


  // кнопка изменить данные клиента
  initTableCellBtnChange(client) {
    const btn = document.createElement('button');
    btn.classList.add('table__change', 'btn-reset');
    btn.innerHTML = `<svg class="table__change-svg">
                        <use xlink:href="#change"></use>
                      </svg>
                      <span class="table__change-text">Изменить</span>`

    btn.addEventListener('click', () => {
      this.form.formVisible('Изменить данные', client);
    });

    return btn;
  }

  // кнопка удалить данные клиента
  initTableCellBtnDelete(client) {
    const btn = document.createElement('button');
    btn.classList.add('table__remove', 'btn-reset');
    btn.innerHTML = `<svg class="table__remove-svg">
                        <use xlink:href="#remove"></use>
                      </svg>
                      <span class="table__remove-text">Удалить</span>`

    btn.addEventListener('click', () => {
      this.formDeleteView.formVisible(client.id);
    })

    return btn;
  }

  // удаление контакта
  deleteContact() {
    this.tableRow.remove();
  }

  // создание тултипа
  createTooltip(contact) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('table__tooltip');
    const button = document.createElement('button');
    button.classList.add('table__marker', 'btn-reset');
    const svg = this.svgForContact(contact.type);
    button.innerHTML = `<svg class="table__tooltip-icon">
                        <use xlink:href="#${svg}"></use>
                      </svg>`
    const popup = document.createElement('div');
    popup.classList.add('table__popup');
    popup.textContent = `${contact.type}: `;
    const link = document.createElement('a');
    link.classList.add('table__tooltip-link');
    if (contact.type === 'Телефон') {
      const tel = this.formatingTel(contact.value);
      link.setAttribute('href', `tel:+7${tel}`);
    } else link.setAttribute('href', contact.value);
    link.textContent = contact.value;
    popup.append(link);

    tooltip.append(button);
    tooltip.append(popup);


    return tooltip;

  }

  // изменение даты до нужного вида
  changeDate(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }

    return `${day}.${month}.${year}`;
  }

  // изменение времени в дате до нужного вида
  changeTime(value) {
    const date = new Date(value);
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }

    return `${hour}:${minute}`;
  }

  // форматирование номера телефона для href в ссылке
  formatingTel(value) {
    const arrayValue = value.split('');
    const arrayTel = [];
    for (let i = 3; i < arrayValue.length; i++) {
      if (!isNaN(Number(arrayValue[i])) && arrayValue[i] !== ' ') {
        arrayTel.push(arrayValue[i]);
      }
    }
    const tel = arrayTel.join('');
    return tel;
  }

  // соответствие картинки и value select
  svgForContact(type) {
    if (type === 'Телефон') {
      return 'phone';
    } else if (type === 'Email') {
      return 'mail';
    } else if (type === 'Vk') {
      return 'vk';
    } else if (type === 'Facebook') {
      return 'fb';
    } else return 'other';
  }

  // свг с числом скрытых контактов
  svgEmpty(numberHiddenContacts) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('table__tooltip');
    const button = document.createElement('button');
    button.classList.add('table__marker-empty', 'btn-reset');
    button.textContent = `+${numberHiddenContacts}`;

    tooltip.append(button);

    return tooltip;
  }
}