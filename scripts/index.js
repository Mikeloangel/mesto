/*********************/
/* Usefull Variables */
/*********************/

// global consts 
const popupOpenedClasName = 'popup_opened';

// UL for appending items
const placesContainer = document.querySelector(".section-gallery__grid");
const placeTemplate = document.querySelector('#place').content;

// UI btns const
const userBtnEdit = document.querySelector('.section-user__edit');
const placeBtnNew = document.querySelector('.section-user__addpost');

// user const
const userName = document.querySelector('.section-user__name');
const userDescription = document.querySelector('.section-user__description');

// popup edit user consts
const popupUser = document.querySelector('.popup_edituser');
const popupUserBtnClose = document.querySelector('.popup__btn-close');
const popupUserForm = document.querySelector('.popup__form');
const popupUserInputName = document.querySelector('#form__name');
const popupUserInputDescription = document.querySelector('#form__desctiption');

// popup new place consts
const popupNewPlace = document.querySelector('.popup_newplace');
const popupNewPlaceForm = document.querySelector('.popup__form_newplace');
const popupNewPlaceInputName = document.querySelector('.popup__place-name');
const popupNewPlaceInputUrl = document.querySelector('.popup__place-url');
const popupNewPlaceBtnClose = popupNewPlace.querySelector('.popup__btn-close');

//popup view place
const popupPlaceView = document.querySelector('.popup_viewplace');
const popupPlaceViewImg = popupPlaceView.querySelector('.popup__fig-img');
const popupPlaceViewCaption = popupPlaceView.querySelector('.popup__fig-caption');
const popupPlaceViewBtnClose = popupPlaceView.querySelector('.popup__btn-close');


/**********************/
/* ABSTRACT FUNCTIONS */
/**********************/

//open popup by it's ID
function openPopup(popupID){
    popupID.classList.add(popupOpenedClasName);
}

//close popup by it's id
function closePopup(popupID){
    popupID.classList.remove(popupOpenedClasName);
}


/************************/
/* PLACE ITEMS FUNCTIONS */
/************************/

// Creating Place
function createPlace(obj) {
    const newPlace = placeTemplate.querySelector('.section-gallery__item').cloneNode(true);

    newPlace.querySelector('.place__img').src = obj.link;
    newPlace.querySelector('.place__img').alt = obj.name;
    newPlace.querySelector('.place__title').textContent = obj.name;
    
    newPlace.querySelector('.place__like').addEventListener('click', e => elementLikeToggle(e.target));    
    newPlace.querySelector('.place__trash').addEventListener('click', e => elementPlaceRemove(e.target.closest('.section-gallery__item')));
    newPlace.addEventListener('click', e => {    
        if(e.target.classList.contains('place__img')){openPopupPlaceView(e);}
    });

    return newPlace;

    // elementPlaceApend(newPlace);
}

// toggle my heart 
function elementLikeToggle (heartElement, className = 'place__like_active'){
    heartElement.classList.toggle(className);
}

// delete that place
function elementPlaceRemove(placeElement){
    placeElement.remove();
}

// add this beautifull place like a charm
function elementPlaceApend(newPlace){
    placesContainer.prepend(newPlace);
}


/*****************/
/* USER POPUP    */
/*****************/

// OPEN POPUP user edit
function openPopupUser() {
    popupUserInputName.value = userName.textContent;
    popupUserInputDescription.value = userDescription.textContent;

    openPopup(popupUser);
}

// CLOSE POPUP user edit
function closePopupUser() {
    closePopup(popupUser);
}

// SUBMITTING POPUP form user edit
function submitPopupUser(e) {
    e.preventDefault();
    
    if (popupUserInputName.value.length === 0 || popupUserInputDescription.value.length === 0) {
        alert('данные введены неверно или отсутствуют');
        return;
    }

    // swaping back from inputs to section-user fields
    userName.textContent = popupUserInputName.value;
    userDescription.textContent = popupUserInputDescription.value;

    // ʕ´⁰̈ᴥ⁰̈`ʔ на случай очень длинных параметров решил добавить более подробный текст в подсказку ʕ´⁰̈ᴥ⁰̈`ʔ
    // if (popupUserInputName.value.length > 15) userName.title = popupUserInputName.value.slice(0, 100);
    // if (popupUserInputDescription.value.length > 35) userDescription.title = popupUserInputName.value.slice(0, 180);
    // ok, saving for later

    closePopupUser();
}



/******************/
/* ADD PLACE POPUP*/
/******************/

function openPopupNewPlace() {
    openPopup(popupNewPlace);
}

function closePopupNewPlace() {
    closePopup(popupNewPlace);
}

function submitPopupNewPlace(e) {
    e.preventDefault();
    
    if (popupNewPlaceInputName.value.length === 0 || !RegExp(/^(http|https):\/\/[^ "]+$/).test(popupNewPlaceInputUrl.value)) {
        alert('данные введены неверно или отсутствуют');
        return;
    }

   elementPlaceApend( createPlace({
        name: popupNewPlaceInputName.value,
        link: popupNewPlaceInputUrl.value
    }));

    popupNewPlaceForm.reset();
    closePopup(popupNewPlace);
}



/******************/
/*PLACE VIEW POPUP*/
/******************/

function openPopupPlaceView(e){    
    openPopup(popupPlaceView);

    popupPlaceViewImg.src = e.target.src;
    popupPlaceViewImg.alt = e.target.alt;
    popupPlaceViewCaption.textContent = e.target.alt;
}

function closePopupPlaceView(){
    closePopup(popupPlaceView);
}



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
initialCards.forEach(obj => elementPlaceApend(createPlace(obj)));