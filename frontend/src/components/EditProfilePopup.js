import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from './App'

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext)
  const { isLoading } = React.useContext(AppContext)

  const [name, setName] = React.useState(user.name)
  const [description, setDescription] = React.useState(user.about)

  React.useEffect(() => {
    setName(user.name)
    setDescription(user.about)
  }, [user, props.isOpen])

  function handleSubmit(event) {
    event.preventDefault()

    props.onUpdateUser({
      name: name,
      job: description,
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen ? 'popup_opened' : ''}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="user"
      buttonText={isLoading ? 'Сохранить...' : 'Сохранить'}
    >
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="input-name"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="input-name-error popup__error">#</span>

      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        id="input-job"
        className="popup__input popup__input_type_job"
        type="text"
        name="job"
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="input-job-error popup__error">#</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
