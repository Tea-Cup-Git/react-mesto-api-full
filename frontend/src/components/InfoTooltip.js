import React from 'react';

function InfoTooltip({ isOpen, onClose, text, icon }) {
  return (
    <div id="image-form" className={`popup ${isOpen && 'popup_open'}`}>
      <div className='popup__container'>
        <button
          id="image-expander_close-button"
          className="popup__close-button"
          type="reset"
          onClick={onClose}
        />
        <div className='auth-tooltip'>
          <img alt='icon' src={icon} />
          <p className='auth-tooltip__text'>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;