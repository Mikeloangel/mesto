import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit, handleOpen = null }) {
    super({ popupSelector });

    this._handleSubmit = handleSubmit;
    this._handleOpen = handleOpen;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__form-input');
    this._formButtonElement = this._formElement.querySelector('.popup__submit');
    this._formButtonDefaultText = this._formButtonElement.textContent;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(data){
    this._inputList.forEach( input => input.value = data[input.name]);
  }

  handleSubmitButton(inProcess){
    this._formButtonElement.textContent = inProcess ? 'Сохранение...' : this._formButtonDefaultText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  open(){
    if(this._handleOpen) this._handleOpen();
    super.open();
  }

}
