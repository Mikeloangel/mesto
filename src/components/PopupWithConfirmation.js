import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleSubmit, title = null, buttonlabel = null }) {
    super({ popupSelector });

    this._titleElement = this._popup.querySelector('.popup__title');
    this._form = this._popup.querySelector('.popup__form');
    this._buttonElement = this._popup.querySelector('.popup__submit');
    this._formButtonDefaultText = this._buttonElement.textContent;

    this.setPopup(title,buttonlabel);

    this._handleSubmit = handleSubmit;
  }

  setPopup(title, buttonlabel) {
    this._titleElement.textContent = title ? title : 'Are you sure?';
    this._formButtonDefaultText = buttonlabel ? buttonlabel : 'Yes!';
    this._buttonElement.textContent = this._formButtonDefaultText;
  }

  buttonSubmitting(inProcess){
    this._buttonElement.textContent = inProcess ? 'Сохранение...' : this._formButtonDefaultText;
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
