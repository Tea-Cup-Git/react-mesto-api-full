import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ headerName, headerUser, loggedIn, signOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Mesto. Russia" />
      <div className={`${loggedIn ? 'header__container' : 'header__container_hidden'}`}>
        <p className='header__user'>{headerUser}</p>
        <p className='header__exit' onClick={signOut}>Выйти</p>
      </div>            
      <Link to={`${headerName === 'Регистрация' ? '/sign-up' : '/sign-in'}`} 
        className={`${loggedIn ? 'header__container_hidden' : 'header__title'}`}>{headerName}</Link>
    </header>
  )
}

export default Header;
