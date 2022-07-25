// FORM VALIDATION function expected params
// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__form-input',
//     submitButtonSelector: '.popup__submit',
//     inactiveButtonClass: 'popup__submit_disabled',
//     inputErrorClass: 'popup__form-input_type_error',
//     errorClass: 'popup__form-error-visible'
//   });

export function enableValidation(settings){
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

export function checkInputValidity(formElement, inputElement, errorClass){
    !inputElement.validity.valid ?
        showInputError(formElement, inputElement, errorClass, inputElement.validationMessage) :
        hideInputError(formElement, inputElement, errorClass);

}

export function showInputError(formElement, inputElement, errorClass, errorMessage){    
    const errorElement  = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

export function hideInputError(formElement, inputElement, errorClass){
    const errorElement  = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '#';
}

export function toggleSumitButtonState( buttonElement, inputList, inactiveButtonClass = false){        
    if(hasInvalidInput(inputList)){   
        inactiveButtonClass ? 
            buttonElement.classList.add(inactiveButtonClass) :
            buttonElement.disabled = true;
    }else{
        inactiveButtonClass ?
            buttonElement.classList.remove(inactiveButtonClass) :
            buttonElement.disabled = false;
    }
}

export function hasInvalidInput(inputList){
    return inputList.some(inputElement => !inputElement.validity.valid);
}
