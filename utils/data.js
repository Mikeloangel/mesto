/*********************/
/* Usefull Variables */
/*********************/

// form validation settings object
export const globalSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
}

// list of form validators objects
export const formValidators = {}

// containers and templates
export const placesContainer = document.querySelector(".section-gallery__grid");
export const placeTemplateSelector = '#place';

// UI btns const
export const userBtnEdit = document.querySelector('.section-user__edit');
export const placeBtnNew = document.querySelector('.section-user__addpost');


// user section const 
export const userName = document.querySelector('.section-user__name');
export const userDescription = document.querySelector('.section-user__description');


// /////////////
// POPUP consts
// ////////////
export const popupOpenedClassName = 'popup_opened';
// export const popupFormInputClassName = 'popup__form-input';

// popup edit user consts
export const popupUser = document.querySelector('.popup_edituser');
export const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');
export const popupUserForm = popupUser.querySelector('.popup__form');
export const popupUserInputName = popupUser.querySelector('.popup__user-name');
export const popupUserInputDescription = popupUser.querySelector('.popup__user-description');

// popup new place consts
export const popupNewPlace = document.querySelector('.popup_newplace');
export const popupNewPlaceBtnClose = popupNewPlace.querySelector('.popup__btn-close');
export const popupNewPlaceForm = popupNewPlace.querySelector('.popup__form');
export const popupNewPlaceInputName = popupNewPlace.querySelector('.popup__place-name');
export const popupNewPlaceInputUrl = popupNewPlace.querySelector('.popup__place-url');

//popup view place
export  const popupPlaceView = document.querySelector('.popup_viewplace');
export const popupPlaceViewBtnClose = popupPlaceView.querySelector('.popup__btn-close');
export const popupPlaceViewImg = popupPlaceView.querySelector('.popup__fig-img');
export const popupPlaceViewCaption = popupPlaceView.querySelector('.popup__fig-caption');