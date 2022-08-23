/**
 * Class to create a Card object to insert in DOM
 */
export default class Card {
  /**
   *
   * @param {Object} data object with form settings (name and link)
   * @param {String} templateSelector selector name
   * @param {Functon} handleCardClick this function will be called to open card
   */

  constructor({ name, link , _id, likes, createdAt, owner}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._createdAt = createdAt;
    this._owner = owner;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _setTemplate() {
    this._cardElement = document.querySelector(this._templateSelector).content.cloneNode(true).querySelector('.place__item');

    this._imgElement = this._cardElement.querySelector('.place__img');
    this._titleElement = this._cardElement.querySelector('.place__title');
    this._likeElement = this._cardElement.querySelector('.place__like');
    this._trashElement = this._cardElement.querySelector('.place__trash');
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._toggleLike.bind(this));
    this._trashElement.addEventListener('click', this._removeCard.bind(this));
    this._imgElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  _toggleLike() {
    this._likeElement.classList.toggle('place__like_active');
  }

  _removeCard() {
    this._cardElement.remove()
    this._cardElement=null;
  }

  createCard() {
    this._setTemplate();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
