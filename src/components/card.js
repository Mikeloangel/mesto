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

  constructor({ name, link, _id, likes, createdAt, owner }, templateSelector, handleCardClick, handleCardDelete, currentUser, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;

    this._currentUser = currentUser;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLikeClick;

    this.isOwner = this._owner._id === currentUser._id;

  }

  updateLike(){
    this.isLiked = this._likes.some(like => like._id === this._currentUser._id);

    if(this.isLiked){
      this._likeElement.classList.add('place__like_active')
    }else{
      this._likeElement.classList.remove('place__like_active')
    }
  }

  _setTemplate() {
    this._cardElement = document.querySelector(this._templateSelector).content.cloneNode(true).querySelector('.place__item');

    this._imgElement = this._cardElement.querySelector('.place__img');
    this._titleElement = this._cardElement.querySelector('.place__title');
    this._likeElement = this._cardElement.querySelector('.place__like');
    this._likeCounterElement = this._cardElement.querySelector('.place__like-counter');
    this._trashElement = this._cardElement.querySelector('.place__trash');

    if (!this.isOwner) {
      this._trashElement.remove();
    }

    this.updateLike();
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._toggleLike.bind(this));
    this._imgElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    if (this.isOwner) this._trashElement.addEventListener('click', (e) => this._handleCardDelete(this));
  }

  _toggleLike() {
    this._handleLike(this , this.updateLikeInfo.bind(this));
  }

  removeCard() {
    this._cardElement.remove()
    this._cardElement = null;
  }

  //this function goes as call back on click event for like element
  updateLikeInfo(likes){
    this._likes = likes;
    this._likeCounterElement.innerText = likes.length;
    this.updateLike();
  }

  getId(){
    return this._id;
  }

  createCard() {
    this._setTemplate();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCounterElement.innerText = this._likes.length;

    this._setEventListeners();

    return this._cardElement;
  }
}
