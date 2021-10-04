class ClientServer {
  constructor() {
    this.getListClients();
  }

  async getListClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    console.log(data);
    return data;
  }
}

new ClientServer();