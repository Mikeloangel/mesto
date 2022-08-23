import Popup from "./Popup.js";

export default class PopupWithNotification extends Popup {
  constructor({ popupSelector, title = null, message = null }) {
    super({ popupSelector });

    this._titleElement = this._popup.querySelector('.popup__title');
    this._messageElement = this._popup.querySelector('.popup__message')

    this.setFields(title, message);
  }

  setFields(title, message) {
    this.setTitle(title);
    this.setMessage(message);
  }

  setTitle(title) {
    this._titleElement.textContent = title;
  }

  setMessage(message) {
    this._messageElement.textContent = message;
  }
}
