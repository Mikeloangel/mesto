import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector })
    this._img = this._popup.querySelector('.popup__fig-img');
    this._caption = this._popup.querySelector('.popup__fig-caption');
  }

  open({ link, name }) {
    this._img.src = link;
    this._img.alt = name;
    this._caption = name;
    super.open();
  }

  close() {
    this._img.src = '#';
    this._img.alt = 'N/A';
    this._caption = 'N/A';
    super.close();
  }
}
