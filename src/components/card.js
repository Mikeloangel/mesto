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

  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);

    this._imgElement = cardElement.querySelector('.place__img');
    this._titleElement = cardElement.querySelector('.place__title');
    this._likeElement = cardElement.querySelector('.place__like');
    this._trashElement = cardElement.querySelector('.place__trash');

    return cardElement;
  }

  _setEventListeners(template) {
    this._likeElement.addEventListener('click', e => this._toggleLike(e.target));
    this._trashElement.addEventListener('click', e => this._removePlace(e.target.closest('.place__item')));
    this._imgElement.addEventListener('click', e => this._handleCardClick(this._link, this._name));
  }

  _toggleLike(likeElement) {
    likeElement.classList.toggle('place__like_active');
  }

  _removePlace(placeElement) {
    placeElement.remove();
    placeElement = null;
  }

  createPlace() {
    const newPlace = this._getTemplate();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners(newPlace);

    return newPlace;
  }
}
