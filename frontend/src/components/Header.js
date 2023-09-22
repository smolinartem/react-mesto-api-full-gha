import { useState } from 'react'
import headerLogo from '../images/svg/logo.svg'
import { Routes, Route, Link } from 'react-router-dom'
import burger from '../images/svg/burger.svg'
import close from '../images/svg/burger-close.svg'

function Header({ email, loggedIn, onSignOut }) {
  function handleClick() {
    onSignOut()
    setBurgerOpen(true)
  }

  const [burgerOpen, setBurgerOpen] = useState(true)
  function handleBurgerClick() {
    setBurgerOpen((prev) => !prev)
  }

  return (
    <>
      {loggedIn && (
        <nav style={{ display: burgerOpen ? 'none' : 'flex' }} className="header__menu">
          <span className="header__email">{email}</span>
          <button className="header__signout hover" onClick={handleClick}>
            Выйти
          </button>
        </nav>
      )}
      <header className="header">
        <a className="header__link" href="#!">
          <img className="header__logo" src={headerLogo} alt="Логотип сайта." />
        </a>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__auth hover" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__auth hover" to="/sign-up">
                Регистрация
              </Link>
            }
          />
        </Routes>
        {loggedIn && (
          <>
            <nav className="header__nav">
              <span className="header__email">{email}</span>
              <button className="header__signout hover" onClick={handleClick}>
                Выйти
              </button>
            </nav>
            <button
              style={
                burgerOpen ? { backgroundImage: `url(${burger})` } : { backgroundImage: `url(${close})` }
              }
              onClick={handleBurgerClick}
              className="header__burger hover"
            />
          </>
        )}
      </header>
    </>
  )
}

export default Header
