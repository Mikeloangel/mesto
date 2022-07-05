const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error'
  }; 

function enableValidation(settings){
    const formList = document.querySelectorAll(settings.formSelector);
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submit = form.querySelector(settings.submitButtonSelector);


} 