/**
 * Class to create a Card object to insert in DOM
 */
export class Card {
    /**
     * 
     * @param {Object} data object with form settings (name and link)
     * @param {String} templateSelector selector name 
     * @param {Functon} handleCardClick this function will be called to open card
     */
    constructor(data, templateSelector, handleCardClick){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        // вот это да, кайф =) функция как тип данных в JS это что то :-D 
        // еще раз, спасибо, эту работу было делать оочень интересно! 
        // °\(^▿^)/°
        this._handleCardClick({
            name: this._name,
            link: this._link
        });
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