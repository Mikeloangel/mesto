import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleSubmit, title = null, buttonLabel = null }) {
    super({ popupSelector });

    this._titleElement = this._popup.querySelector('.popup__title');
    this._form = this._popup.querySelector('.popup__form');
    this._buttonElement = this._form.querySelector('.popup__submit');
    this._formButtonDefaultText = this._buttonElement.textContent;

    this.setPopup(title,buttonLabel);

    this._handleSubmit = handleSubmit;
  }

  setPopup(title, buttonLabel) {
    this._titleElement.textContent = title ? title : 'Are you sure?';
    this._formButtonDefaultText = buttonLabel ? buttonLabel : 'Yes!';
    this._buttonElement.textContent = this._formButtonDefaultText;
  }

  handleSubmitButton(inProcess){
    this._buttonElement.textContent = inProcess ? 'Сохранение...' : this._formButtonDefaultText;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._callbackObject);
    })
  }

  open(callbackObject = null) {
    this._callbackObject = callbackObject;
    super.open();
  }
}
