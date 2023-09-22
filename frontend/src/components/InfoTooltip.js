import { usePopupClose } from '../hooks/usePopupClose'
import { AppContext } from './App'
import { useContext } from 'react'
import imgOk from '../images/svg/auth-ok.svg'
import imgNo from '../images/svg/auth-no.svg'

function InfoTooltip({ status, message, isOpen }) {
  const { closeAllPopups } = useContext(AppContext)
  usePopupClose(isOpen, closeAllPopups)

  return (
    <section className={`popup info popup_${isOpen ? 'opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={closeAllPopups}
          className="popup__close hover"
          type="button"
          aria-label="Кнопка закрыть."
        />
        <img className="info__img" src={status ? imgOk : imgNo} alt={message} />
        <h2 className="info__title">{message}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip
