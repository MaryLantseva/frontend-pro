import ClientServer from "./client-server";

export default class LogicalPath {
  constructor() {
    this.clientServer = new ClientServer();
  }

  // добавить нового клиента на сервер
  postNewClient(client) {
    return this.clientServer.createNewClient(client);
  }

  // достать всех клиентов с сервера
  getAllClients() {
    return this.clientServer.getAllClients();
  }

  // достать клиента с сервера по его id
  getClient(id) {
    return this.clientServer.getClient(id);
  }

  // изменение данных клиента 
  patchClient(id, client) {
    return this.clientServer.patchClient(id, client);
  }

  // удаление клиента
  deleteClient(id) {
    return this.clientServer.deleteClient(id);
  }
}