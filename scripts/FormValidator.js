/**
 * Class to enable form validation
 */
export class FormValidator{
    /**
     * 
     * @param {Object} settings object with settings 
     * @param {Object} formElement accepts HTMLFormElement
     */
    constructor(settings, formElement){
        this._formSelector = settings.formSelector; //       
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    _toggleSumitButtonState(){
        if(this._hasInvalidInput()){   
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        }else{
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }   
    }

    _checkInputValidity(inputElement){
        !inputElement.validity.valid ?
            this._showInputError(inputElement):
            this._hideInputError(inputElement);
    }

    _showInputError(inputElement){
        const errorElement  = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(inputElement){
        const errorElement  = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '#';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _hasInvalidInput(){
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    enableValidation(){
        this._inputList.forEach( inputElement => {            
            this._toggleSumitButtonState();

            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSumitButtonState();
            });            
        });      
    }

    revalidate(){
        this._toggleSumitButtonState();
        this._inputList.forEach(inputElement => this._checkInputValidity(inputElement));
    }
}