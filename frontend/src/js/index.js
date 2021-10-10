import TableView from './models/tableView'
// import ClientServer from './models/client-server'
// import FormAddContactView from './models/formAddContactView'
import Choices from './library/choices.min' 
import '../styles/styles.css' 
import '../styles/sccs/scss.scss'

import './sprite'
import './img'

// const Select = () => {
//   const element = document.querySelector('.select');
//   const choices = new Choices(element, {
//     searchEnabled: false
//   });
// }


document.addEventListener('DOMContentLoaded', ()=> {
  new TableView();
  // new ClientServer();
  // new Select();
})


