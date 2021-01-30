import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ _id, link, name, likes, owner, onCardClick, onCardLike, onCardDelete }) {
  const card = { _id: _id, link: link, name: name, owner: owner, likes: likes };
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__trash-button ${isOwn ? '' : 'card__trash-button_hidden'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div id="card-template">
      <div className="card">
        <img className="card__image" src={link} alt={name} onClick={handleClick} />
        <p className="card__name">{name}</p>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
        <div className="card__likes">
          <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike} />
          <p className="card__like-count">{likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
