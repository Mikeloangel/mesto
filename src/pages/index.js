/******************/
/**** CONTENTS ****/
//
// 1. Import modules
// 2. Enabling Form Validation
// 3. Popups
// 4. SECTION: cards rendering
// 5. User Info
// 6. Event listeners
// 7. Frontend hardcode
/******************/

/********************/
/* 1. Import Export */
/********************/

import {
  globalSettings, formValidators,
  placesContainerSelector,
  placeTemplateSelector,
  userBtnEdit, placeBtnNew,
} from '../utils/data.js';

import initialCards from '../utils/places.js';
import initialUser from '../utils/user.js'

import Section from '../components/Section.js'
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';


/***********************/
/* 2. FORM VALIDATION  */
/***********************/

enableValidation(globalSettings);

/**
 * enabling form validation
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


/*************/
/* 3 POPUPS  */
/*************/

//User edit popup
const popupUserEdit = new PopupWithForm(
  {
    popupSelector: '.popup_edituser',
    handleSubmit: (e) => {
      e.preventDefault();

      //gets all named inputs and sets its values
      const formValues = popupUserEdit._getInputValues();

      userInfo.setUserInfo({
        name:formValues['popup__user-name'],
        description:formValues['popup__user-description']
      })

      popupUserEdit.close();
    },
    handleOpen: () => {
      // const formValues = popupUserEdit._getInputValues();
      const uinfo = userInfo.getUserInfo();
      popupUserEdit._form.querySelector('.popup__user-name').value = uinfo.name;
      popupUserEdit._form.querySelector('.popup__user-description').value = uinfo.description;

      formValidators[popupUserEdit._form.name].revalidate();
    }
  }
);
popupUserEdit.setEventListeners();


//Add card popup
const popupAddCard = new PopupWithForm(
  {
    popupSelector: '.popup_newplace',
    handleSubmit: (e) => {
      e.preventDefault();

      const formValues = popupAddCard._getInputValues();

      cardSection.addItem(createPlace({
        name: formValues['popup__place-name'],
        link: formValues['popup__place-url']
      }, placeTemplateSelector));

      popupAddCard.close();
      formValidators[popupAddCard._form.name].revalidate(true);
    }
  }
);
popupAddCard.setEventListeners();


//View card
const popupImage = new PopupWithImage({ popupSelector: '.popup_viewplace' });
popupImage.setEventListeners();

function handleCardClick(link, name) {
  popupImage.open({ link, name });
}


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
 * returns initalised and filled Card object based on obj data,
 *
 * @param {Object} obj contains initial value for card and passes it to Card constructor (e.g. name, link )
 * @returns {DOM node}
 */
function createPlace(obj, selector = '#place') {
  return new Card(obj, selector, handleCardClick).createPlace();
}

/*****************/
/* 5. User Info  */
/*****************/

const userInfo =  new UserInfo({
  nameSelector:'.section-user__name',
  descriptionSelector: '.section-user__description'
});

/***********************/
/* 6. EVENT LISTENERS  */
/***********************/

// user edit btn listener
userBtnEdit.addEventListener('click', popupUserEdit.open.bind(popupUserEdit));


// new card listener
placeBtnNew.addEventListener('click', popupAddCard.open.bind(popupAddCard));


/***********************/
/* 7. FRONTEND HARDCODE*/
/***********************/
userInfo.setUserInfo({
  name: initialUser.name,
  description: initialUser.description
})
