import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit, handleOpen = null }) {
    super({ popupSelector });

    this._handleSubmit = handleSubmit;
    this._handleOpen = handleOpen;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__form-input');
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }


  /// ツ крутотааа ツ спасибо! ツ
  setInputValues(data){
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  open(){
    if(this._handleOpen) this._handleOpen();
    super.open();
  }

}
