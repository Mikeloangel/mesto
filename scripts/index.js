/*********************/
/* Usefull Variables */
/*********************/

// global consts 
const popupOpenedClasName = 'popup_opened';

// UL for appending items and card template
const placesContainer = document.querySelector(".place__container");
const placeTemplate = document.querySelector('#place').content;

// UI btns const
const userBtnEdit = document.querySelector('.section-user__edit');
const placeBtnNew = document.querySelector('.section-user__addpost');

// user section const
const userName = document.querySelector('.section-user__name');
const userDescription = document.querySelector('.section-user__description');

// popup edit user consts
const popupUser = document.querySelector('.popup_edituser');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');
const popupUserForm = popupUser.querySelector('.popup__form');
const popupUserInputName = popupUser.querySelector('.popup__user-name');
const popupUserInputDescription = popupUser.querySelector('.popup__user-description');

// popup new place consts
const popupNewPlace = document.querySelector('.popup_newplace');
const popupNewPlaceBtnClose = popupNewPlace.querySelector('.popup__btn-close');
const popupNewPlaceForm = popupNewPlace.querySelector('.popup__form');
const popupNewPlaceInputName = popupNewPlace.querySelector('.popup__place-name');
const popupNewPlaceInputUrl = popupNewPlace.querySelector('.popup__place-url');

//popup view place
const popupPlaceView = document.querySelector('.popup_viewplace');
const popupPlaceViewBtnClose = popupPlaceView.querySelector('.popup__btn-close');
const popupPlaceViewImg = popupPlaceView.querySelector('.popup__fig-img');
const popupPlaceViewCaption = popupPlaceView.querySelector('.popup__fig-caption');


/**********************/
/* ABSTRACT FUNCTIONS */
/**********************/

//open popup by it's ID
function openPopup(popup){
    popup.classList.add(popupOpenedClasName);
}

//close popup by it's id
function closePopup(popup){
    popup.classList.remove(popupOpenedClasName);
}


/************************/
/* PLACE ITEMS FUNCTIONS */
/************************/

// Creating Place
function createPlace(obj) {
    const newPlace = placeTemplate.querySelector('.place__item').cloneNode(true);

    newPlace.querySelector('.place__img').src = obj.link;
    newPlace.querySelector('.place__img').alt = obj.name;
    newPlace.querySelector('.place__title').textContent = obj.name;
    
    newPlace.querySelector('.place__like').addEventListener('click', e => toggleLike(e.target));    
    newPlace.querySelector('.place__trash').addEventListener('click', e => removePlace(e.target.closest('.place__item')));    
    newPlace.querySelector('.place__img').addEventListener('click',openPopupPlaceView);

    return newPlace;
}

// toggle my heart 
function toggleLike (heartElement, className = 'place__like_active'){
    heartElement.classList.toggle(className);
}

// delete that place
function removePlace(placeElement){
    placeElement.remove();
}

// add this beautifull place like a charm
function apendPlace(newPlace){
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

    apendPlace( createPlace({
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
    popupPlaceViewImg.src = e.target.src;
    popupPlaceViewImg.alt = e.target.alt;
    popupPlaceViewCaption.textContent = e.target.alt;

    openPopup(popupPlaceView);
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

// POPUP new place listenersform__name
placeBtnNew.addEventListener('click', openPopupNewPlace);
popupNewPlaceBtnClose.addEventListener('click', closePopupNewPlace);
popupNewPlaceForm.addEventListener('submit', submitPopupNewPlace);

// POPUP view place listeners
popupPlaceViewBtnClose.addEventListener('click', closePopupPlaceView);


/*******************/
/*FRONTEND HARDCODE*/
/*******************/

// populating initial data for places
initialCards.forEach(obj => apendPlace(createPlace(obj)));