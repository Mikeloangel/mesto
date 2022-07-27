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
// 4. Other app functions
// 5. Event listeners
// 6. Frontend hardcode
/******************/

/********************/
/* 1. Import Export */
/********************/

import {
    globalSettings, formValidators,
    placesContainer, placeTemplateSelector,
    userBtnEdit, placeBtnNew,
    userName, userDescription,
    popupOpenedClassName,
    popupUser, popupUserBtnClose, popupUserForm, popupUserInputName, popupUserInputDescription,
    popupNewPlace, popupNewPlaceBtnClose, popupNewPlaceForm, popupNewPlaceInputName, popupNewPlaceInputUrl,
    popupPlaceView, popupPlaceViewBtnClose, popupPlaceViewImg, popupPlaceViewCaption
  } from './data.js';    

import {initialCards} from './places.js';

import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';


/*********************************/
/* 2. FORM VALIDATION OBJECT WAY */
/*********************************/

// какая же теперь красота, спасибо огромное за совет! ヽ(ヅ)ノ
enableValidation(globalSettings);

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
   
    apendPlace(createPlace({
        name: popupNewPlaceInputName.value,
        link: popupNewPlaceInputUrl.value
    }, placeTemplateSelector));

    popupNewPlaceForm.reset();

    closePopup(popupNewPlace);
}

/*******************************/
/* 3.4 CHILD POPUP: view place */
/*******************************/

export function openPopupPlaceView(e) {
    popupPlaceViewImg.src = e.target.src;
    popupPlaceViewImg.alt = e.target.alt;
    popupPlaceViewCaption.textContent = e.target.alt;

    openPopup(popupPlaceView);
}

function closePopupPlaceView() {
    closePopup(popupPlaceView);
}


/**************************/
/* 4. OTHER APP FUNCTIONS */
/**************************/

/**
 * inserting card into places container
 * @param {DOM Node} newPlace 
 */
function apendPlace(newPlace) {
    placesContainer.prepend(newPlace);
}

/**
 * returns initalised and filled Card object based on obj data,
 * 
 * @param {Object} obj contains initial value for card and passes it to Card constructor (e.g. name, link )
 * @returns {DOM node} 
 */
function createPlace(obj, selector = '#place'){
    return new Card(obj, selector).createPlace();
}


/**
 * enabling form validation OOP and universal way
 *  
 * @param {Object} settings 
 */
function enableValidation(settings){
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach( form => {
        const formValidator = new FormValidator(settings,form);
        const formName = form.name;
        formValidator.enableValidation();
        formValidators[formName] = formValidator;
    });
}

function handleCardClick(obj){
    popupPlaceViewImg.src = e.target.src;
    popupPlaceViewImg.alt = e.target.alt;
    popupPlaceViewCaption.textContent = e.target.alt;

    openPopup(popupPlaceView);
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

// POPUP view place listeners
popupPlaceViewBtnClose.addEventListener('click', closePopupPlaceView);


/***********************/
/* 6. FRONTEND HARDCODE*/
/***********************/

// populating initial data for places
initialCards.forEach(obj =>  apendPlace(createPlace(obj, placeTemplateSelector)));
