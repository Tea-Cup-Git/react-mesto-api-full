import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({ isOpen, onClose, onDeleteConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteConfirm();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeletePopup;