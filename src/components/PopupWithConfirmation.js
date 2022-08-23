import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleSubmit, title = null, buttonlabel = null }) {
    super({ popupSelector });

    this._titleElement = this._popup.querySelector('.popup__title');
    this._form = this._popup.querySelector('.popup__form');
    this._buttonElement = this._popup.querySelector('.popup__submit');

    this.setPopup(title,buttonlabel);

    this._handleSubmit = handleSubmit;
  }

  setPopup(title, buttonlabel) {
    this._titleElement.textContent = title ? title : 'Are you sure?';
    this._buttonElement.textContent = buttonlabel ? buttonlabel : 'Yes!';
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._keepObject);
    })
  }

  open(keepObject) {
    this._keepObject = keepObject;
    super.open();
  }
}
