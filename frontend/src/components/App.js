import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import SuccessIcon from '../images/success-icon.svg';
import FailIcon from '../images/fail-icon.svg';
import { getToken, removeToken, setToken } from "../utils/token";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [InfoTooltipContents, setInfoTooltipContents] = React.useState({});

  const getUserAndCards = async () => {
    try {
      const [dataUser, dataCards] = await Promise.all([api.getUserInfo(), api.getInitialCards()]);
      setCards(dataCards);
      setCurrentUser(dataUser);
    } catch (err) {
      console.log(`Ошибка при загрузке данных: ${err}`);
    }
  };

  React.useEffect(() => {
    if (!loggedIn) return;
    getUserAndCards();
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Развернуть картинку
  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, src: card.link, title: card.name });
  }

  // Добавить/убрать лайк карточки 
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.error(`Ошибка при обновлении лайка: ${err}`));
  }

  // Удалить карточку
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`))
  }

  // Добавить карточку
  function handleAddPlaceSubmit(title, src) {
    setIsLoading(true);
    api.addCard({ name: title, link: src, alt: title })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при добавлении карточки: ${err}`))
  }

  // Обновить данные пользователя
  function handleUpdateUser(name, description) {
    console.log(name)
    console.log(description)
    setIsLoading(true);
    api.setUserInfo({ name: name, about: description })
      .then((dataUser) => {
        console.log(dataUser)
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при обновлении данных: ${err}`))
  }

  // Обновить аватар пользователя
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setUserAvatar({ avatar: avatar })
      .then(dataAvatar => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при обновлении аватара: ${err}`))
  }

  // Закрыть модальное окно
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setIsInfoTooltipOpen(false);
    setIsLoading(false);
  }

  function handleContentGetter(token) {
    return auth.getContent(token)
      .then((res) => {
        setUserData(res.email);
        setLoggedIn(true);
        history.push('/');
      })
  }

  function tokenCheck() {
    const token = getToken();
    if (!token) {
      return;
    }
    handleContentGetter(token)
      .catch((err) => {
        if (err === 401) {
          console.log('Ошибка передачи токена')
        }
      });
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  // Регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setInfoTooltipContents({ message: 'Вы успешно зарегистрировались!', icon: SuccessIcon });
        history.push('/sign-in');
      })
      .catch((err) => setInfoTooltipContents({ message: `Что-то пошло не так! Попробуйте ещё раз. (${err})`, icon: FailIcon }));

    onInfoTooltip();
  }

  // Авторизация
  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((data) => {
      if (!data) {
        return;
      }
      if (data.token) {
        setToken(data.token);
        handleContentGetter(data.token)
      }
    })
    .catch((err) => {
      if (err === 400) {
        console.log('Не передано одно из полей');
      } else if (err === 401) {
        console.log('Пользователь с данным email не найден');
      }
    });
  }

  // Выйти из аккаунта
  function signOut() {
    setLoggedIn(false);
    setUserData('');
    removeToken();
    history.push('/sign-in');
  }

  function onInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              userData={userData}
              signOut={signOut}
            />
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='/sign-in'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              {<Redirect to={`${loggedIn ? '/' : '/sign-in'}`} />}
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup
            cardSrc={selectedCard.src}
            cardTitle={selectedCard.title}
            isOpen={selectedCard.isOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            text={InfoTooltipContents.message}
            icon={InfoTooltipContents.icon} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
