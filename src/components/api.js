export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getFetchRequest(route, method) {
    return fetch(
      `${this._baseUrl}${route}`,
      { method, headers: this._headers });
  }

  handleError(responce) {
    console.error(`Error: ${responce}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._headers);
  }

  getUserMe = () => this._getFetchRequest('/users/me', 'GET');

}
