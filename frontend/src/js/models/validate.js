// class Validate {
//   constructor() {

//   }

//   validateText(text) {
//     const value = text.trim();
//     if (value.length <= 1) {
//       return 'Должно быть минимум 2 буквы';
//     }
//     const pattern = new RegExp(/[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
//     if (pattern.test(value)) {
//       return 'Не должно быть спецсимволов';
//     }
//     const arrayValue = value.split('');
//     for (let i = 0; i < arrayValue.length; i++) {
//       if (!isNaN(Number(arrayValue[i]))) {
//         return 'Не должно быть чисел';
//       }
//     }
//     return true;

//   }
// }