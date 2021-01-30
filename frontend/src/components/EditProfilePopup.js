import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }
  
  function handleChange(e) {
    e.target.name === 'userName' ? setName(e.target.value) : setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input id="user-input" className="popup__input popup__input_type_user-name"
        name="userName" type="text" minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
        placeholder="Имя" defaultValue={name} onChange={handleChange} required />
      <span id="user-input-error" className="popup__input-error"></span>
      <input id="about-input" className="popup__input popup__input_type_user-about"
        name="userAbout" type="text" minLength="2" maxLength="200" 
        placeholder="О себе" defaultValue={description} onChange={handleChange} required />
      <span id="about-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
