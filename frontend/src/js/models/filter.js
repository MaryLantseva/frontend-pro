export default class Filter {

  filterByFullName(value, sortedArray) {
    const arrayRows = sortedArray.filter(item => {
      const fullName = `${item.surname} ${item.name} ${item.lastName}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });
    return arrayRows;
  }

  filterById(value, sortedArray) {
    const arrayRows = sortedArray.filter(item => {
      return item.id.includes(value);
    });
    return arrayRows;
  }
}