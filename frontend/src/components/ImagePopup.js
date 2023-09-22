import { useContext } from 'react'
import { AppContext } from './App'
import { usePopupClose } from '../hooks/usePopupClose'

function ImagePopup({ card }) {
  const { closeAllPopups } = useContext(AppContext)

  usePopupClose(card?.link, closeAllPopups)

  return (
    <section className={`popup popup_picture ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button
          onClick={closeAllPopups}
          className="popup__close hover"
          type="button"
          aria-label="Кнопка закрыть."
        ></button>
        <img className="popup__img" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup
