/*************************/
/* INITIAL TEMPLATE DATA */
/*************************/
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*****************/
/* ADDING PLACES */
/*****************/

// place grid
const places = document.querySelector(".section-gallery__grid");
const placeTemplate = document.querySelector('#place').content;

function createPlace(obj) {
    const newPlace = placeTemplate.querySelector('.section-gallery__item').cloneNode(true);

    newPlace.querySelector('.place__img').src = obj.link;
    newPlace.querySelector('.place__img').alt = obj.name;
    newPlace.querySelector('.place__title').textContent = obj.name;
    newPlace.querySelector('.place__like').addEventListener('click', e => e.target.classList.toggle('place__like_active'));
    newPlace.querySelector('.place__trash').addEventListener('click', e => e.target.parentElement.parentElement.remove());
    newPlace.addEventListener('click', e => {    
        if(e.target.classList.contains('place__img')){
            openPopupPlaceView(e);
        }
    });

    places.prepend(newPlace);
}

// populating initial data for places
initialCards.forEach(obj => createPlace(obj));

/*****************/
/* USER POPUP    */
/*****************/

const popupUser = document.querySelector('.popup_edituser');
const btnClose = document.querySelector('.popup__btn-close');
const formSubmit = document.querySelector('.popup__form');
const inputName = document.querySelector('#form__name');
const inputDescription = document.querySelector('#form__desctiption');
const btnEdit = document.querySelector('.section-user__edit');
const userName = document.querySelector('.section-user__name');
const userDescription = document.querySelector('.section-user__description');

// OPEN POPUP user edit
function openPopupUser(e) {
    popupUser.classList.add('popup_opened');

    //swaping values to inputs from section-user
    inputName.value = userName.textContent;
    inputDescription.value = userDescription.textContent;
}

// CLOSE POPUP user edit
function closePopupUser(e) {
    popupUser.classList.remove('popup_opened');
}

// SUBMITTING DATA : EVERYTHING IS POSSIBLE WITH JS
function submitPopupUser(e) {
    e.preventDefault();
    
    if (inputName.value.length === 0 || inputDescription.value.length === 0) return;

    // swaping back from inputs to section-user fields
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;

    // ʕ´⁰̈ᴥ⁰̈`ʔ на случай очень длинных параметров решил добавить более подробный текст в подсказку ʕ´⁰̈ᴥ⁰̈`ʔ
    if (inputName.value.length > 15) userName.title = inputName.value.slice(0, 100);
    if (inputDescription.value.length > 35) userDescription.title = inputName.value.slice(0, 180);

    closePopupUser();
}

// POPUP user edit listeners
btnEdit.addEventListener('click', openPopupUser);
btnClose.addEventListener('click', closePopupUser);
formSubmit.addEventListener('submit', submitPopupUser);

/******************/
/* ADD PLACE POPUP*/
/******************/
const btnAddPlace = document.querySelector('.section-user__addpost');
const popupPlaceAdd = document.querySelector('.popup_newplace');
const placeName = document.querySelector('.popup__place-name');
const placeUrl = document.querySelector('.popup__place-url');

function openPopupAddPlace(e) {
    popupPlaceAdd.classList.add('popup_opened');
}

function closePopupAddPlace(e) {
    popupPlaceAdd.classList.remove('popup_opened');
}

function submitPopupAddPlace(e) {
    e.preventDefault();

    if (placeName.value.length < 3 || placeUrl.value.length === 0) return;

    createPlace({
        name: placeName.value,
        link: placeUrl.value
    });

    closePopupAddPlace();    
}

// POPUP add place listeners
btnAddPlace.addEventListener('click', openPopupAddPlace);
popupPlaceAdd.querySelector('.popup__btn-close').addEventListener('click', closePopupAddPlace);
popupPlaceAdd.querySelector('.popup__form').addEventListener('submit', submitPopupAddPlace);

/******************/
/*PLACE VIEW POPUP*/
/******************/

popupPlaceView = document.querySelector('.popup_viewplace');

function openPopupPlaceView(e){
    popupPlaceView.classList.add('popup_opened');

    popupPlaceView.querySelector('.popup__fig-img').src = e.target.parentElement.querySelector('.place__img').src;
    popupPlaceView.querySelector('.popup__fig-img').alt = e.target.parentElement.querySelector('.place__img').alt;
    popupPlaceView.querySelector('.popup__fig-caption').textContent = e.target.parentElement.querySelector('.place__img').alt;    
}

function closePopupPlaceView(e){
    popupPlaceView.classList.remove('popup_opened');
}

// POPUP place view listeners
popupPlaceView.querySelector('.popup__btn-close').addEventListener('click', closePopupPlaceView);
