/******************/
/**** CONTENTS ****/
//
// 1. Api and initial data
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
  userBtnEdit, userBtnEditAvatar, placeBtnNew,
} from '../utils/data.js';

import Section from '../components/Section.js'
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithNotification from '../components/PopupWithNotification.js';

import UserInfo from '../components/UserInfo.js';
import Api from '../components/api.js'


/* 1. instantiates Api and loads initial data for user info and cards */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'f965250c-63b8-497e-85ae-bfe5bf7bc71a',
    'Content-Type': 'application/json'
  }
});


//Loads user info and then initial cards
api.getUserMe()
  .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't load user ${res.status}`))
  .then(udata => {
    userInfo.setUserInfo(udata);
    //returns new Promise to load cards after user info is loaded
    return api.getInitialCards();
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't load initial cards ${res.status}`))
  .then(data => {
    cardSection.concatItems(data);
    cardSection.render();
  })
  .catch(err => api.handleError(err, handleApiError));

/* 2. Enables form validation */
enableValidation(globalSettings);

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(form => {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
    formValidators[form.name] = formValidator;
  });
}


/* 3 POPUPS  */

//User edit popup
const popupUserEdit = new PopupWithForm(
  {
    popupSelector: '.popup_edituser',
    handleSubmit: (e) => {
      e.preventDefault();
      popupUserEdit.buttonSubmitting(true);

      const formValues = popupUserEdit.getInputValues();
      const userData = {
        name: formValues['popup__user-name'],
        about: formValues['popup__user-description']
      }

      api.pathchUserMe(userData)
        .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't update user info ${res.status}`))
        .then(data => userInfo.setUserInfo(data))
        .catch(err => api.handleError(err, handleApiError))
        .finally(() => {
          popupUserEdit.close();
          popupUserEdit.buttonSubmitting(false)
        });
    },
    handleOpen: () => {
      const { name, about } = userInfo.getUserInfo();

      popupUserEdit.setInputValues({
        'popup__user-name': name,
        'popup__user-description': about
      })

      formValidators[popupUserEdit._formElement.name].revalidate();
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

      popupAddCard.buttonSubmitting(true);

      const formValues = popupAddCard.getInputValues();

      const newCardCredentials = {
        name: formValues['popup__place-name'],
        link: formValues['popup__place-url']
      }

      api.postNewCard(newCardCredentials)
        .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't add new card ${res.status}`))
        .then(data => cardSection.addItem(createPlace(data, placeTemplateSelector)))
        .catch(err => api.handleError(err, handleApiError))
        .finally(() => {
          popupAddCard.buttonSubmitting(false);
          popupAddCard.close();
          formValidators[popupAddCard._formElement.name].revalidate(true);
        })

    },
    handleOpen: () => {
      formValidators[popupAddCard._formElement.name].revalidate(true);
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

//Popup with confirmation to delete card
const popupConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_confirm',
  handleSubmit: (cardObject) => {
    popupConfirmation.buttonSubmitting(true);

    api.deleteCard(cardObject.getId())
      .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't delete card ${res.status}`))
      .then(() => cardObject.removeCard())
      .catch(err => api.handleError(err, handleApiError))
      .finally(() => {
        popupConfirmation.close();
        popupConfirmation.buttonSubmitting(false);
      });
  }
});
popupConfirmation.setEventListeners();
popupConfirmation.setPopup('Вы уверены?', 'Да')

function handleCardDelete(cardObject) {
  popupConfirmation.open(cardObject);
}

//Edit avatar
const popupUserEditAvatar = new PopupWithForm({
  popupSelector: '.popup_editavatar',
  handleSubmit: (e) => {
    e.preventDefault();

    popupUserEditAvatar.buttonSubmitting(true);

    const newLink = popupUserEditAvatar.getInputValues()['popup__avatar-link'];

    api.patchUserAvatar(newLink)
      .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't update user avatar ${res.status}`))
      .then(data => userInfo.setAvatar(data.avatar))
      .catch(err => api.handleError(err, handleApiError))
      .finally(() => {
        popupUserEditAvatar.close();
        popupUserEditAvatar.buttonSubmitting(false);
      });
  }
})
popupUserEditAvatar.setEventListeners();

// Popup Error Handlers
const popupShowError = new PopupWithNotification({ popupSelector: '.popup_errors' })
popupShowError.setEventListeners();
popupShowError.setTitle('Ошибка')

function handleApiError(responce) {
  popupShowError.setMessage(responce)
  popupShowError.open();
}


/* 4. Section with cards  */
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


/**
 * returns initalised and filled Card object based on obj data,
 *
 * @param {Object} obj contains initial value for card and passes it to Card constructor (e.g. name, link )
 * @returns {DOM node}
 */
function createPlace(obj, selector = '#place') {
  return new Card(obj, selector, handleCardClick, handleCardDelete, userInfo.getUserInfo(), handleCardLike).createCard();
}

function handleCardLike(id, method, cb) {
  if (method === 'PUT') {
    api.putLike(id)
      .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't put like ${res.status}`))
      .then(data => cb(data))
      .catch(err => api.handleError(err, handleApiError))
  }

  if (method === 'DELETE') {
    api.deleteLike(id)
      .then(res => res.ok ? res.json() : Promise.reject(`Sorry can't delete like, it's awesome ${res.status}`))
      .then(data => cb(data))
      .catch(err => api.handleError(err, handleApiError))
  }
}


/* 5. User Info  */

const userInfo = new UserInfo({
  nameSelector: '.section-user__name',
  descriptionSelector: '.section-user__description',
  avaSelector: '.section-user__pic'
});


/* 6. EVENT LISTENERS  */

// user edit btn listener
userBtnEdit.addEventListener('click', popupUserEdit.open.bind(popupUserEdit));
userBtnEditAvatar.addEventListener('click', popupUserEditAvatar.open.bind(popupUserEditAvatar));

// new card listener
placeBtnNew.addEventListener('click', popupAddCard.open.bind(popupAddCard));
