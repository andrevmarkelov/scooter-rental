import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { ADMIN_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import styles from './Header.module.scss';


export const Header = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    navigate(CATALOG_ROUTE);
  }

  return (
    <header>
      <Link to={CATALOG_ROUTE} className={styles.logo}>
        <img width={50} height={50} src='/image/logotype.png' alt='logo' />
        <div className={styles.title}>
          <h1>Scooter Rental</h1>
          <p>Anytime Everywhere</p>
        </div>
      </Link>
      {user.isAuth ?
        <div>
          <button onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</button>
          <button onClick={logOut}>Logout</button>
        </div>
        :
        <button onClick={() => navigate(LOGIN_ROUTE)} className={styles.loginButton}>Login</button>}
    </header>
  )
}