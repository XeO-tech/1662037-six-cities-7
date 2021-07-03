import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/api-actions';
import { Redirect } from 'react-router';
import { AppRoute } from '../../const';
import { isEmailAddress, isPassword } from '../../utils/utils';
import { Link } from 'react-router-dom';

function SignIn() {
  const loginRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const dispatch = useDispatch();

  const onFormChange = () => {
    loginRef.current.setCustomValidity('');
    passwordRef.current.setCustomValidity('');

    if (!isEmailAddress(loginRef.current.value)) {
      loginRef.current.setCustomValidity('Login should be a valid email address');
    }

    if (!isPassword(passwordRef.current.value)) {
      passwordRef.current.setCustomValidity('Password shouldn\'t be blank or spaces only');
    }

    formRef.current.reportValidity();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formRef.current.reportValidity()) {
      return;
    }

    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  if (localStorage.token) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile" >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onChange={onFormChange}
              ref={formRef}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="foo">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default SignIn;
