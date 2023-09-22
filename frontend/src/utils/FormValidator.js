export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._hoverButtonClass = config.hoverButtonClass
    this._formElement = formElement
  }

  _showInputError(input, error) {
    input.classList.add(this._inputErrorClass)
    error.textContent = input.validationMessage
    error.classList.add(this._errorClass)
  }

  _hideInputError(input, error) {
    input.classList.remove(this._inputErrorClass)
    error.classList.remove(this._errorClass)
    error.textContent = ''
  }

  _checkInputValidity(input) {
    const error = document.querySelector(`.${input.id}-error`)
    if (!input.checkValidity()) {
      this._showInputError(input, error)
    } else {
      this._hideInputError(input, error)
    }
  }

  _disableButtonSubmit() {
    this._button.setAttribute('disabled', '')
    this._button.classList.add(this._inactiveButtonClass)
  }

  _enableButtonSubmit() {
    this._button.removeAttribute('disabled')
    this._button.classList.remove(this._inactiveButtonClass)
  }

  _checkFormValidity() {
    if (!this._formElement.checkValidity()) {
      this._disableButtonSubmit()
    } else {
      this._enableButtonSubmit()
    }
  }

  resetValidation() {
    this._disableButtonSubmit()
    this._inputs.forEach((input) => {
      const error = document.querySelector(`.${input.id}-error`)
      this._hideInputError(input, error)
    })
  }

  _setEventListeners() {
    console.log(this._formElement)
    this._inputs = this._formElement.querySelectorAll(this._inputSelector)
    this._button = this._formElement.querySelector(this._submitButtonSelector)

    this._checkFormValidity()

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._checkFormValidity()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}

/* const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
} */

/* const userForm = document.forms['popup-user']
const userValidation = new FormValidator(validatorConfig, userForm)
userValidation.enableValidation()

const avatarForm = document.forms['popup-avatar']
const avatarValidation = new FormValidator(validatorConfig, avatarForm)
avatarValidation.enableValidation()

const cardsForm = document.forms['popup-gallery']
const cardsValidation = new FormValidator(validatorConfig, cardsForm)
cardsValidation.enableValidation() */
