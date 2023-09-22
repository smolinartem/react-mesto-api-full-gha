import React from 'react'
import PopupWithForm from './PopupWithForm'
import { AppContext } from './App'

function EditAvatarPopup(props) {
  const { isLoading } = React.useContext(AppContext)
  const avatarRef = React.useRef()

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen ? 'popup_opened' : ''}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar"
      buttonText={isLoading ? 'Сохранить...' : 'Сохранить'}
    >
      <input
        ref={avatarRef}
        id="input-avatar"
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="input-avatar-error popup__error">#</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
