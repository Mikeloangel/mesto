export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._btnClose = this._popup.querySelector('.popup__btn-close');
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape')
      this.close();
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._btnClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click',
      (e) => {
        if (e.target.classList.contains('popup')) { this.close() }
      })
  }
}

