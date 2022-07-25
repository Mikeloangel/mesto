import {openPopupPlaceView} from './index.js'

export class Card {
    constructor(data,templateSelector){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardElement;
    }

    _setEventListeners(template){
        template.querySelector('.place__like').addEventListener('click', e => this._toggleLike(e.target));
        template.querySelector('.place__trash').addEventListener('click', e => this._removePlace(e.target.closest('.place__item')));
        template.querySelector('.place__img').addEventListener('click', e => this._openPopup(e));
    }

    _toggleLike(likeElement){
        likeElement.classList.toggle('place__like_active');
    }

    _removePlace(placeElement){
        placeElement.remove();
    }

    _openPopup(e){
        openPopupPlaceView(e);
    }
    
    createPlace(){
        const newPlace = this._getTemplate();
        
        const imgItem = newPlace.querySelector('.place__img');
        const titleItem = newPlace.querySelector('.place__title');

        imgItem.src = this._link;
        imgItem.alt = this._name;
        titleItem.textContent = this._name;
        
        this._setEventListeners(newPlace);       

        return newPlace;
    }
}