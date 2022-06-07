let popup = document.querySelector('.popup');

let btnEdit = document.querySelector('.section-user__edit');
let btnClose = document.querySelector('.popup__btn-close');
let formSubmit = document.querySelector('.popup__form');

let userName = document.querySelector('.section-user__name');
let userDescription = document.querySelector('.section-user__description');

let inputName = document.querySelector('#form__name');
let inputDescription = document.querySelector('#form__desctiption');


// OPEN POPUP : EASY!
function openPopup(e) {
    popup.classList.toggle('popup_opened');

    // but what if? ヾ(-_- )ゞ
    if (!popup.classList.contains('popup_opened')) return;

    //swaping values to inputs from section-user
    inputName.value = userName.textContent;
    inputDescription.value = userDescription.textContent;
}

// CLOSE POPUP : EVEN EASIER!
function closePopup(e) {
    //just remove
    popup.classList.remove('popup_opened');
}

// SUBMITTING DATA : EVERYTHING IS POSSIBLE WITH JS
function submitPopup(e) {
    e.preventDefault();

    //in case user forgot to input something
    if (inputName.value.length === 0 || inputDescription.value.length === 0) return;

    // swaping back from inputs to section-user fields
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;

    // ʕ´⁰̈ᴥ⁰̈`ʔ на случай очень длинных параметров решил добавить более подробный текст в подсказку ʕ´⁰̈ᴥ⁰̈`ʔ
    if (inputName.value.length > 15) userName.title = inputName.value.slice(0,100);
    if (inputDescription.value.length > 35) userDescription.title = inputName.value.slice(0,180);

    closePopup();
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
formSubmit.addEventListener('submit', submitPopup);
