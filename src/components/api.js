export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getFetchRequest(route, method, body=null) {
    return body ?
      fetch(`${this._baseUrl}${route}`,{ method, headers: this._headers, body: JSON.stringify(body) }) :
      fetch(`${this._baseUrl}${route}`,{ method, headers: this._headers });
  }

  handleError(responce) {
    console.error(`Error: ${responce}`);
  }

  getInitialCards = () => this._getFetchRequest('/cards','GET');

  getUserMe = () => this._getFetchRequest('/users/me', 'GET');

  pathchUserMe = body => this._getFetchRequest('/users/me','PATCH',body);

  postNewCard = body => this._getFetchRequest('/cards','POST',body);

  deleteCard = id => this._getFetchRequest(`/cards/${id}`,'DELETE');

  putLike = id => this._getFetchRequest(`/cards/${id}/likes`,'PUT');

  deleteLike = id =>this._getFetchRequest(`/cards/${id}/likes`,'DELETE');

  patchUserAvatar = url => this._getFetchRequest(`/users/me/avatar`,'PATCH',{avatar:url});
}
