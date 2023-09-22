import React from 'react'
import PopupWithForm from './PopupWithForm'
import { AppContext } from './App'

function AddPlacePopup(props) {
  const { isLoading } = React.useContext(AppContext)
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault()
    props.onAddPlaceSubmit({ name: name, link: link })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen ? 'popup_opened' : ''}
      onSubmit={handleSubmit}
      title="Новое место"
      name="gallery"
      buttonText={isLoading ? 'Создать...' : 'Создать'}
    >
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="input-place"
        className="popup__input popup__input_type_place"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="input-place-error popup__error">#</span>
      <input
        value={link}
        onChange={(event) => setLink(event.target.value)}
        id="input-link"
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="input-link-error popup__error">#</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
