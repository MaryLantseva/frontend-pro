export default class ClientServer {

  // достать список всех клиентов
  async getAllClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    return data;
  }

  // достать клиента по id
  async getClient(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    const data = await response.json();
    return data;
  }

  // создать нового клиента
  async createNewClient(client) {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: client.name,
        surname: client.surname,
        lastName: client.lastname,
        contacts: client.contacts
      })
    });
    return response;
  }

  // изменить клиента по id
  async patchClient(id, client) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    });
    return response;
  }

  // удалить клиента по id 
  async deleteClient(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 404)
      console.log('Не удалось удалить клиента, так как его не существует');
    const data = await response.json();
    return data;
  }
}






