export default class Sort {

  // сортировка столбца с ФИО
  sortingByFullName(sortedRows) {
    sortedRows.sort((a, b) => {

      if (a.surname > b.surname) { return 1 }
      if (a.surname < b.surname) { return -1 }
      if (a.surname === b.surname) {
        if (a.name > b.name) { return 1 }
        if (a.name < b.name) { return -1 }
        if (a.name === b.name) {
          if (a.lastName > b.lastName) { return 1 }
          if (a.lastName < b.lastName) { return -1 }
          if (a.lastName === b.lastName) { return 0 }
        }
      }
    })
    return sortedRows;
  }

  // сортировка столбца с ID
  sortingById(sortedRows) {
    sortedRows.sort((a, b) => {

      if (a.id > b.id) { return 1 }
      if (a.id < b.id) { return -1 }
      if (a.id === b.id) { return 0 }
    })

    return sortedRows;
  }

  // сортировка столбца с датой добавления
  sortingByDateAdd(sortedRows) {
    sortedRows.sort((a, b) => {

      if (a.createdAt > b.createdAt) { return 1 }
      if (a.createdAt < b.createdAt) { return -1 }
      if (a.createdAt === b.createdAt) { return 0 }
    })
    return sortedRows;
  }

  // сортировка столбца с датой изменения
  sortingByDateChange(sortedRows) {
    sortedRows.sort((a, b) => {

      if (a.updatedAt > b.updatedAt) { return 1 }
      if (a.updatedAt < b.updatedAt) { return -1 }
      if (a.updatedAt === b.updatedAt) { return 0 }
    })
    return sortedRows;
  }

  // сортировка столбца с ФИО обр
  sortingByFullNameDesc(sortedRows) {
    return this.sortingByFullName(sortedRows).reverse();
  }

  // сортировка столбца с ID
  sortingByIdDesc(sortedRows) {
    return this.sortingById(sortedRows).reverse();
  }

  // сортировка столбца с датой добавления
  sortingByDateAddDesc(sortedRows) {
    return this.sortingByDateAdd(sortedRows).reverse();
  }

  // сортировка столбца с датой изменения
  sortingByDateChangeDesc(sortedRows) {
    return this.sortingByDateChange(sortedRows).reverse();
  }
}