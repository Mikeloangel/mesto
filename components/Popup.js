export default class Popup {
    constructor({popupSelector}) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (e) => {
        if (e.key === 'Escape' || (e.type === 'click' && e.target.classList.contains('popup'))) {
            this.close();
        }
    }

    open() {
        this.setEventLIsteners(true);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this.setEventLIsteners(false);
        this._popup.classList.remove('popup_opened');
    }

    setEventLIsteners(enable=true) {
        if(enable){
            document.addEventListener('keydown', this._handleEscClose);
            this._popup.addEventListener('click', this._handleEscClose);
        }else{
            document.removeEventListener('keydown', this._handleEscClose);
            this._popup.removeEventListener('click', this._handleEscClose);
        }
    }
}

