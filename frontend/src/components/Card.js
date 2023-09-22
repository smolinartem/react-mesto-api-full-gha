import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const user = React.useContext(CurrentUserContext)

  const isOwner = props.card.owner === user._id
  const isLiked = props.card.likes.some((i) => i === user._id)

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleCardLike() {
    props.onCardLike(props.card)
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="gallery__item">
      <div className="gallery__content">
        {isOwner && (
          <button
            onClick={handleCardDelete}
            className="gallery__trash hover"
            type="button"
            aria-label="Кнопка корзины."
          />
        )}
        <img onClick={handleCardClick} className="gallery__image" src={props.card.link} alt={props.card.name} />
      </div>

      <div className="gallery__info">
        <h2 className="gallery__name">{props.card.name}</h2>
        <div className="gallery__button">
          <button
            onClick={handleCardLike}
            className={`gallery__like hover ${isLiked ? 'gallery__like_active' : ''}`}
            type="button"
            aria-label="Кнопка лайк."
          />
          <span className="gallery__counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
