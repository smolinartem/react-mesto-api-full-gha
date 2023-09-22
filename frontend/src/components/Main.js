import React from 'react'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props) {
  const user = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile" aria-label="Информация о пользователе.">
        <div className="profile__info">
          <div
            style={{ backgroundImage: `url(${user.avatar})` }}
            onClick={props.onEditAvatar}
            className="profile__avatar"
          ></div>
          <div className="profile__person">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__job">{user.about}</p>

            <button
              onClick={props.onEditProfile}
              className="profile__edit hover"
              type="button"
              aria-label="Кпопка для редактирования профиля."
            ></button>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add hover"
          type="button"
          aria-label="Кпопка для добавления фотографий."
        ></button>
      </section>

      <section className="gallery" aria-label="Галлерея фотографий.">
        <ul className="gallery__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
