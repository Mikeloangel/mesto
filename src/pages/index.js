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
  validationConfig, formValidators,
  placesContainerSelector,
  placeTemplateSelector,
  userBtnEdit, userBtnEditAvatar, placeBtnNew,
} from '../utils/data.js';

import Section from '../components/Section.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithNotification from '../components/PopupWithNotification.js';

import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'


/* 1. instantiates Api and loads initial data for user info and cards */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'f965250c-63b8-497e-85ae-bfe5bf7bc71a',
    'Content-Type': 'application/json'
  }
});


//Loads user info and then initial cards
const userPromise = api.getUserMe();
const initialCardsPromise = api.getInitialCards();

Promise.all([userPromise,initialCardsPromise])
  .then(list =>{
    const [udata,cardList] = list;
    userInfo.setUserInfo(udata);
    cardSection.concatItems(cardList.reverse());
    cardSection.render();
  })
  .catch(err => api.handleError(err,handleApiError))


/* 2. Enables form validation */
enableValidation(validationConfig);

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
      popupUserEdit.handleSubmitButton(true);

      const formValues = popupUserEdit.getInputValues();
      const userData = {
        name: formValues['popup__user-name'],
        about: formValues['popup__user-description']
      }

      api.pathchUserMe(userData)
        .then(data => {
          userInfo.setUserInfo(data);
          popupUserEdit.close();
        })
        .catch(err => api.handleError(err, handleApiError))
        .finally(() => popupUserEdit.handleSubmitButton(false));
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

      popupAddCard.handleSubmitButton(true);

      const formValues = popupAddCard.getInputValues();

      const newCardCredentials = {
        name: formValues['popup__place-name'],
        link: formValues['popup__place-url']
      }

      api.postNewCard(newCardCredentials)
        .then(data => {
          cardSection.addItem(createPlace(data, placeTemplateSelector))
          popupAddCard.close();
        })
        .catch(err => api.handleError(err, handleApiError))
        .finally(() => {
          popupAddCard.handleSubmitButton(false);
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
    popupConfirmation.handleSubmitButton(true);

    api.deleteCard(cardObject.getId())
      .then(() => {
        cardObject.removeCard();
        popupConfirmation.close();
      })
      .catch(err => api.handleError(err, handleApiError))
      .finally(() => popupConfirmation.handleSubmitButton(false));
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

    popupUserEditAvatar.handleSubmitButton(true);

    const newLink = popupUserEditAvatar.getInputValues()['popup__avatar-link'];

    api.patchUserAvatar(newLink)
      .then(data => {
        userInfo.setAvatar(data.avatar)
        popupUserEditAvatar.close();
      })
      .catch(err => api.handleError(err, handleApiError))
      .finally(() => popupUserEditAvatar.handleSubmitButton(false));
  }
})
popupUserEditAvatar.setEventListeners();

// Popup Error Handlers
const popupShowError = new PopupWithNotification({ popupSelector: '.popup_errors' })
popupShowError.setEventListeners();
popupShowError.setTitle('Ошибка')

function handleApiError(response) {
  popupShowError.setMessage(response)
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

function handleCardLike(cardObject, onRequestCompleted) {
  if (cardObject.isLiked) {
    api.deleteLike(cardObject.getId())
      .then(data => onRequestCompleted(data.likes))
      .catch(err => api.handleError(err, handleApiError))
  }else{
    api.putLike(cardObject.getId())
      .then(data => onRequestCompleted(data.likes))
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
