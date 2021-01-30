import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
      avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input id="avatar-input" className="popup__input popup__input_type_image-link"
            name="userAvatar" type="url" placeholder="Ссылка на изображение" ref={avatarRef} required />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;