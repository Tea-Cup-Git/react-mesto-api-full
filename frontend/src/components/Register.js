import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Register = ({ handleRegister }) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = (evt) => {
    evt.target.name === 'Email' ? setEmail(evt.target.value) : setPassword(evt.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.log('Необходимо заполнить все поля');
      return;
    }

    handleRegister(email, password)
    resetForm();
  };

  return (
    <>
      <Header headerName='Войти' />
      <section className='auth-section'>
        <h2 className='auth-section__title'>Регистрация</h2>
        <form className='auth-section__form' onSubmit={handleSubmit} noValidate>
          <input type='email' className='auth-section__input' placeholder='Email' value={email} name='Email' onChange={handleChange}></input>
          <input type='password' className='auth-section__input' placeholder='Password' value={password} name='Password' onChange={handleChange}></input>
          <button type='submit' className='auth-section__button'>Зарегистрироваться</button>
        </form>
        <p className='auth-section__text'>Уже зарегистрированы?<Link to='/sign-in' className='auth-section__link'>&nbsp;Войти</Link></p>
      </section>
      <Footer />
    </>
  )
};

export default Register;