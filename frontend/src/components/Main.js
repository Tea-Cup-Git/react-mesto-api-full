import React from 'react';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onCardClick, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header 
        headerUser={props.userData} 
        loggedIn={props.loggedIn} 
        signOut={props.signOut} 
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          </div>
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          />
          <div className="profile__info">
            <div className="profile__button-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          />
        </section>
        <section className="photo-grid">
          {cards.map(({_id, link, name, owner, likes}) => 
              <Card 
                key={_id} _id={_id} link={link} name={name} owner={owner} likes={likes}
                onCardClick={onCardClick} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete} 
              />
            )
          }
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Main;
