let popup = document.querySelector('.popup');

let btnEdit = document.querySelector('.section-bio__edit');
let btnClose = document.querySelector('.popup__btn-close');
let btnSubmit = document.querySelector('.popup__form-submit');

// in case popUp is open on load we will politely close it
popup.classList.contains('popup_opened') ? popup.classList.remove('popup_opened') : console.log(false);


// HOW TO OPEN POPUP? EASY!
btnEdit.addEventListener('click', openPopup);

function openPopup(e){
    popup.classList.toggle('popup_opened');

    // but what if? ヾ(-_- )ゞ
    if(!popup.classList.contains('popup_opened')) return;

    let userName = document.querySelector('.section-bio__uname');
    let userDescription = document.querySelector('.section-bio__udescription');

    let inputName = document.querySelector('#form__name');
    let inputDescription = document.querySelector('#form__desctiption');

    //swaping values to inputs from section-bio
    inputName.value = userName.textContent;
    inputDescription.value = userDescription.textContent;

}

// CLOSE POPUP : EVEN EASIER!
btnClose.addEventListener('click', closePopup);

function closePopup(e){
    //just remove
    popup.classList.remove('popup_opened'); 
}

// SUBMITTING DATA : EVERYTHING IS POSSIBLE WITH JS
btnSubmit.addEventListener('click', submitPopup);

function submitPopup(e){
    e.preventDefault();
    
    let userName = document.querySelector('.section-bio__uname');
    let userDescription = document.querySelector('.section-bio__udescription');

    let inputName = document.querySelector('#form__name');
    let inputDescription = document.querySelector('#form__desctiption');

    //in case user forgot to input something
    if(inputName.value.length === 0 || inputDescription.value.length === 0) return;

    // swaping back from inputs to section-bio fields
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;
    
    closePopup();
}