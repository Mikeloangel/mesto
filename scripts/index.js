/*****************/
/* Import Export */
/*****************/

import {
    globalSettings, popupOpenedClassName, popupFormInputClassName, placesContainer,
    userBtnEdit, placeBtnNew, userName, userDescription, popupUser, popupUserBtnClose, popupUserForm,
    popupUserInputName, popupUserInputDescription, popupNewPlace, popupNewPlaceBtnClose, popupNewPlaceForm,
    popupNewPlaceInputName, popupNewPlaceInputUrl, popupPlaceView, popupPlaceViewBtnClose, popupPlaceViewImg,
    popupPlaceViewCaption } from './data.js';    
// REFACTOR: use * as?

import {enableValidation,checkInputValidity,toggleSumitButtonState,hasInvalidInput} from './validate.js';
// REFACTOR: use * as?
// HINT: showInputError,hideInputError will be private ? 

import {initialCards} from './places.js';
import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';


/*********************/
/* PARENT POPUP CODE */
/*********************/ 

//open popup by it's ID
function openPopup(popup) {
    document.addEventListener('keydown', handlePopupCloseEvents);
    popup.addEventListener('click', handlePopupCloseEvents);

    popup.classList.add(popupOpenedClassName);
}

//close popup by it's id
function closePopup(popup) {
    popup.classList.remove(popupOpenedClassName);

    document.removeEventListener('keydown', handlePopupCloseEvents);
    popup.removeEventListener('click', handlePopupCloseEvents);
}

//handling user actions for close on ESC or popup click
function handlePopupCloseEvents(e) {
    if (e.key === 'Escape' || (e.type === 'click' && e.target.classList.contains('popup'))) {
        closePopup(document.querySelector(`.${popupOpenedClassName}`));
    }
}


/*********************/
/* CHILD POPUP: user */
/*********************/

// OPEN POPUP user edit
function openPopupUser() {
    popupUserInputName.value = userName.textContent;
    popupUserInputDescription.value = userDescription.textContent;

    const inputList = Array.from(popupUserForm.querySelectorAll(`.${popupFormInputClassName}`));
    toggleSumitButtonState(
        popupUserForm.querySelector(globalSettings.submitButtonSelector),
        inputList,
        globalSettings.inactiveButtonClass);

    inputList.forEach(inputElement => {
        checkInputValidity(
            popupUserForm,
            inputElement,
            globalSettings.errorClass);
    });

    openPopup(popupUser);
}

// CLOSE POPUP user edit
function closePopupUser() {
    closePopup(popupUser);
}

// SUBMITTING POPUP form user edit
function submitPopupUser(e) {
    e.preventDefault();

    const inputList = Array.from(popupUserForm.querySelectorAll(globalSettings.inputSelector));
    if (hasInvalidInput(inputList)) {
        return;
    }

    userName.textContent = popupUserInputName.value;
    userDescription.textContent = popupUserInputDescription.value;

    closePopupUser();
}


/*************************/
/* CHILD POPUP: New Place*/
/*************************/

function openPopupNewPlace() {

    const inputList = Array.from(popupNewPlaceForm.querySelectorAll(`.${popupFormInputClassName}`));
    toggleSumitButtonState(
        popupNewPlaceForm.querySelector(globalSettings.submitButtonSelector),
        inputList,
        globalSettings.inactiveButtonClass);

    openPopup(popupNewPlace);
}

function closePopupNewPlace() {
    closePopup(popupNewPlace);
}

function submitPopupNewPlace(e) {
    e.preventDefault();

    const inputList = Array.from(popupNewPlaceForm.querySelectorAll(`.${popupFormInputClassName}`));
    if (hasInvalidInput(inputList)) {
        return;
    }
    
    const newCard = new Card({
            name: popupNewPlaceInputName.value,
            link: popupNewPlaceInputUrl.value
        },'#place');    

    apendPlace(newCard.createPlace());

    popupNewPlaceForm.reset();
    closePopup(popupNewPlace);
}


/***************************/
/* CHILD POPUP: view place */
/***************************/

export function openPopupPlaceView(e) {
    popupPlaceViewImg.src = e.target.src;
    popupPlaceViewImg.alt = e.target.alt;
    popupPlaceViewCaption.textContent = e.target.alt;

    openPopup(popupPlaceView);
}

function closePopupPlaceView() {
    closePopup(popupPlaceView);
}


/************************/
/* PLACE ITEMS FUNCTIONS */
/************************/

// add this beautifull place like a charm
function apendPlace(newPlace) {
    placesContainer.prepend(newPlace);
}


/*******************/
/*VALIDATION FORM  */
/*******************/

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__form-input',
//     submitButtonSelector: '.popup__submit',
//     inactiveButtonClass: 'popup__submit_disabled',
//     inputErrorClass: 'popup__form-input_type_error',
//     errorClass: 'popup__form-error_visible'
//   });

enableValidation(globalSettings);

/*******************/
/*EVENT LISTENERS  */
/*******************/

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


/*******************/
/*FRONTEND HARDCODE*/
/*******************/

// populating initial data for places
initialCards.forEach(obj =>  apendPlace(new Card(obj,'#place').createPlace()));

// openPopupNewPlace();