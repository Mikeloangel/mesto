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
import './index.css';

import {
  globalSettings, formValidators,
  placesContainerSelector,
  placeTemplateSelector,
  userBtnEdit, placeBtnNew,
} from '../utils/data.js';

import Section from '../components/Section.js'
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import UserInfo from '../components/UserInfo.js';
import Api from '../components/api.js'
import { data } from 'autoprefixer';


/*******************************/
/*******************************/

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'f965250c-63b8-497e-85ae-bfe5bf7bc71a',
    'Content-Type': 'application/json'
  }
});

const userPromise = api.getUserMe();
const cardsPromise = api.getInitialCards();

userPromise
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
  .then(udata => {
    userInfo.setUserInfo(udata);
    return cardsPromise;
  })
  .then( res => res.ok ? res.json() : Promise.reject(res.status))
  .then(data =>{
        cardSection.concatItems(data);
        cardSection.render();
      })
  .catch(err => {
    api.handleError(err);
    userInfo.setUserInfo({})
  });


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

      const formValues = popupUserEdit.getInputValues();
      const userData = {
        name: formValues['popup__user-name'],
        about: formValues['popup__user-description']
      }

      api.pathchUserMe(userData)
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => {
          userInfo.setUserInfo(data);
        })
        .catch(err => api.handleError(err));

      popupUserEdit.close();
    },
    handleOpen: () => {
      const { name, about } = userInfo.getUserInfo();

      popupUserEdit.setInputValues({
        'popup__user-name': name,
        'popup__user-description': about
      })

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

      const formValues = popupAddCard.getInputValues();

      const newCardCredentials = {
        name: formValues['popup__place-name'],
        link: formValues['popup__place-url']
      }

      api.postNewCard(newCardCredentials)
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => {
          cardSection.addItem(createPlace(data, placeTemplateSelector));
        })
        .catch(err => api.handleError(err))

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

const popupConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_confirm',
  handleSubmit: (cardObject) => {
    api.deleteCard(cardObject.getId())
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(() => {
        cardObject.removeCard();
        popupConfirmation.close();
      }).catch(err => {
        api.handleError(err);
      });

  }
});
popupConfirmation.setEventListeners();
popupConfirmation.setPopup('Вы уверены?','Да')

function handleCardDelete(cardObject){
  popupConfirmation.open(cardObject);
}

/*******************************/
/* 4. SECTION: cards rendering */
/*******************************/
const cardSection = new Section(
  {
    items: [],
    renderer: (card) => {
      const newCardElement = createPlace(card, placeTemplateSelector)
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
  return new Card(obj, selector, handleCardClick, handleCardDelete, userInfo.getUserInfo(), handleCardLike).createCard();
}

function handleCardLike(id, method, cb){
  if(method==='PUT'){
    api.putLike(id)
      .then(res => res.ok ? res.json() : Promise.reject(res.status) )
      .then( data => cb(data))
      .catch(err => api.handleError(err))
  }

  if(method==='DELETE'){
    api.deleteLike(id)
      .then(res => res.ok ? res.json() : Promise.reject(res.status) )
      .then( data => cb(data))
      .catch(err => api.handleError(err))
  }
}

/*****************/
/* 5. User Info  */
/*****************/

const userInfo = new UserInfo({
  nameSelector: '.section-user__name',
  descriptionSelector: '.section-user__description',
  avaSelector: '.section-user__pic'
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


