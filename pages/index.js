/******************/
/**** CONTENTS ****/
//
// 1. Import modules
// 2. Enabling Form Validation
// 3. Popups code
// // 3.1. Parent popup
// // 3.2. CHILD POPUP: user
// // 3.3. CHILD POPUP: New Place
// // 3.4. CHILD POPUP: view place 
// 4. SECTION: cards rendering
// 5. Event listeners
// 6. Frontend hardcode
/******************/

/********************/
/* 1. Import Export */
/********************/

import {
    globalSettings, formValidators,
    placesContainerSelector, placesContainer, placeTemplateSelector,
    userBtnEdit, placeBtnNew,
    userName, userDescription,
    popupOpenedClassName,
    popupUser, popupUserBtnClose, popupUserForm, popupUserInputName, popupUserInputDescription,
    popupNewPlace, popupNewPlaceBtnClose, popupNewPlaceForm, popupNewPlaceInputName, popupNewPlaceInputUrl,
    popupPlaceView, popupPlaceViewBtnClose, popupPlaceViewImg, popupPlaceViewCaption
} from '../utils/data.js';

import initialCards from '../utils/places.js';

import Section from '../components/Section.js'
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';


// const usrP = new PopupWithImage({popupSelector:'.popup_edituser'});
// usrP.open();
// usrP.close();

/***********************/
/* 2. FORM VALIDATION  */
/***********************/

enableValidation(globalSettings);

/**
 * enabling form validation OOP and universal way
 *  
 * @param {Object} settings 
 */
 function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(form => {
        const formValidator = new FormValidator(settings, form);
        formValidator.enableValidation();
        formValidators[form.name] = formValidator;
    });
}

/*************************/
/* 3.1 PARENT POPUP CODE */
/*************************/

function openPopup(popup) {
    document.addEventListener('keydown', handlePopupCloseEvents);
    popup.addEventListener('click', handlePopupCloseEvents);

    popup.classList.add(popupOpenedClassName);
}

function closePopup(popup) {
    popup.classList.remove(popupOpenedClassName);

    document.removeEventListener('keydown', handlePopupCloseEvents);
    popup.removeEventListener('click', handlePopupCloseEvents);
}


/**
 * handling user actions for close on ESC or popup click
 *  
 * @param {Object} e event
 */
function handlePopupCloseEvents(e) {
    if (e.key === 'Escape' || (e.type === 'click' && e.target.classList.contains('popup'))) {
        closePopup(document.querySelector(`.${popupOpenedClassName}`));
    }
}


/*************************/
/* 3.2 CHILD POPUP: user */
/*************************/

function openPopupUser() {
    popupUserInputName.value = userName.textContent;
    popupUserInputDescription.value = userDescription.textContent;

    formValidators[popupUserForm.name].revalidate();

    openPopup(popupUser);
}

function closePopupUser() {
    closePopup(popupUser);
}

function submitPopupUser(e) {
    e.preventDefault();

    userName.textContent = popupUserInputName.value;
    userDescription.textContent = popupUserInputDescription.value;

    closePopupUser();
}


/*****************************/
/* 3.3 CHILD POPUP: New Place*/
/*****************************/

function openPopupNewPlace() {
    openPopup(popupNewPlace);
}

function closePopupNewPlace() {
    closePopup(popupNewPlace);
}

function submitPopupNewPlace(e) {
    e.preventDefault();

    // apendPlace(createPlace({
    //     name: popupNewPlaceInputName.value,
    //     link: popupNewPlaceInputUrl.value
    // }, placeTemplateSelector));

    cardSection.addItem(createPlace({
        name: popupNewPlaceInputName.value,
        link: popupNewPlaceInputUrl.value
    }, placeTemplateSelector));

    popupNewPlaceForm.reset();
    formValidators[popupNewPlaceForm.name].revalidate(true);

    closePopup(popupNewPlace);
}

/*******************************/
/* 3.4 CHILD POPUP: view place */
/*******************************/

const popupImage = new PopupWithImage({popupSelector:'.popup_viewplace'});

function handleCardClick(link, name) {    
    popupImage.open({link,name});
}

// THIS function is now OBSOLETE
// function handleCardClick(link, name) {
//     // popupPlaceViewImg.src = link;
//     // popupPlaceViewImg.alt = name;
//     // popupPlaceViewCaption.textContent = name;
    
//     // openPopup(popupPlaceView);
// }
// THIS function is now OBSOLETE
// function closePopupPlaceView() {
//     popupPlaceViewImg.src = '';
//     popupPlaceViewImg.alt = '';
//     popupPlaceViewCaption.textContent = '';
//     closePopup(popupPlaceView);
// }

/*******************************/
/* 4. SECTION: cards rendering */
/*******************************/

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (card) => {
            const newCardElement = createPlace({
                name: card.name,
                link: card.link
            }, placeTemplateSelector)
            cardSection.addItem(newCardElement);
        }
    },
    placesContainerSelector
);

cardSection.render();

/**
 * THIS function is now OBSOLETE
 * 
 * inserting card into places container
 * @param {DOM Node} newPlace 
 */
// function apendPlace(newPlace) {
//     placesContainer.prepend(newPlace);
// }

/**
 * returns initalised and filled Card object based on obj data,
 * 
 * @param {Object} obj contains initial value for card and passes it to Card constructor (e.g. name, link )
 * @returns {DOM node} 
 */
function createPlace(obj, selector = '#place') {
    return new Card(obj, selector, handleCardClick).createPlace();
}



/***********************/
/* 5. EVENT LISTENERS  */
/***********************/

// POPUP user edit listeners
userBtnEdit.addEventListener('click', openPopupUser);
popupUserBtnClose.addEventListener('click', closePopupUser);
popupUserForm.addEventListener('submit', submitPopupUser);

// POPUP new place listeners
placeBtnNew.addEventListener('click', openPopupNewPlace);
popupNewPlaceBtnClose.addEventListener('click', closePopupNewPlace);
popupNewPlaceForm.addEventListener('submit', submitPopupNewPlace);

// THIS event listeners now OBSOLETE
// POPUP view place listeners
// popupPlaceViewBtnClose.addEventListener('click', closePopupPlaceView);


/***********************/
/* 6. FRONTEND HARDCODE*/
/***********************/

// OBSOLETE now this done in section object
// populating initial data for places
// initialCards.forEach(obj =>  apendPlace(createPlace(obj, placeTemplateSelector)));
