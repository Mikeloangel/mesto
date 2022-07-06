// FORM VALIDATION function expected params
// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__form-input',
//     submitButtonSelector: '.popup__submit',
//     inactiveButtonClass: 'popup__submit_disabled',
//     inputErrorClass: 'popup__form-input_type_error',
//     errorClass: 'popup__form-error-visible'
//   });

function enableValidation(settings){
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach( formElement => {
        const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const submitButton = formElement.querySelector(settings.submitButtonSelector);

        inputList.forEach( inputElement => {            
            toggleSumitButtonState(submitButton, inputList, settings.inactiveButtonClass );

            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement, settings.errorClass);
                toggleSumitButtonState(submitButton, inputList, settings.inactiveButtonClass );
            });
        });
    });

}

function checkInputValidity(formElement, inputElement, errorClass){
    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, errorClass, inputElement.validationMessage);        
    }else{
        hideInputError(formElement, inputElement, errorClass);
    }
}

function showInputError(formElement, inputElement, errorClass, errorMessage){    
    const errorElement  = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, errorClass){
    const errorElement  = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '#';
}

function toggleSumitButtonState( buttonElement, inputList, inactiveButtonClass = false){        
    if(hasInvalidInput(inputList)){
        if(inactiveButtonClass) {
            buttonElement.classList.add(inactiveButtonClass);
        }else{
            buttonElement.disabled = true;
        }
    }else{
        if(inactiveButtonClass) {            
            buttonElement.classList.remove(inactiveButtonClass);
        }else{
            buttonElement.disabled = false;
        }
    }
}

function hasInvalidInput(inputList){
    return inputList.some( (inputElement) => {
        return !inputElement.validity.valid;
    });
}
