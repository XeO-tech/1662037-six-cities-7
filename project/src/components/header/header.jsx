import React from 'react';
import { connect } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { logout } from '../../store/api-actions';
import PropTypes from 'prop-types';
import { getAuthorizationStatus } from '../../store/user/selectors';


function Header(props) {
  const {authorizationStatus, logoutApp} = props;

  const authorizedUserLink = (
    <>
      <li className="header__nav-item user">
        <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{localStorage.getItem('login')}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          onClick={(evt) => {
            evt.preventDefault();
            logoutApp();
          }}
          to='/'
          className="header__nav-link"
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );

  const unAthorizedUserLink = (
    <li className="header__nav-item user">
      <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.AUTH ? authorizedUserLink : unAthorizedUserLink}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  logoutApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  logoutApp: () => dispatch(logout()),
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

