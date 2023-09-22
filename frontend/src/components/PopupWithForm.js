import React from 'react'
import { AppContext } from './App'
import { usePopupClose } from '../hooks/usePopupClose'

function PopupWithForm({ onSubmit, isOpen, title, name, buttonText, children }) {
  const { closeAllPopups } = React.useContext(AppContext)

  usePopupClose(isOpen, closeAllPopups)

  return (
    <section className={`popup popup_${name} ${isOpen}`}>
      <div className="popup__container">
        <button
          onClick={closeAllPopups}
          className="popup__close hover"
          type="button"
          aria-label="Кнопка закрыть."
        />
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" name={`popup-${name}`}>
          {children}
          <button className="popup__submit hover" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm
