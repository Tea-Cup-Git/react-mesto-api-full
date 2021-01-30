import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = React.useState('');
  const [src, setSrc] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setSrc('');
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(title, src);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSrcChange(e) {
    setSrc(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input id="name-input" className="popup__input popup__input_type_place-name"
            name="cardName" type="text" minLength="1" maxLength="30"placeholder="Название" 
            value={title} onChange={handleTitleChange} required />
      <span id="name-input-error" className="popup__input-error"></span>
      <input id="link-input" className="popup__input popup__input_type_image-link"
            name="cardLink" type="url" placeholder="Ссылка на изображение" 
            value={src} onChange={handleSrcChange} required />
      <span id="link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;