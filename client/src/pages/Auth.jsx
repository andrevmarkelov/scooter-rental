import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { Header } from '../components/Header';
import { login, register } from '../http/userApi';
import { CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';


export const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const checkAuth = async () => {
    try {
      let data;

      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await register(name, email, phone, password);
      }

      user.setUser(user);
      user.setIsAuth(true);
      navigate(CATALOG_ROUTE);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='wrapper'>
      <Header />
      <h1>{isLogin ? 'Login' : 'Sign Up now'}</h1>
      <div className="form">
        {isLogin ?
          <div>
            <input type="email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          :
          <div>
            <input type="text" placeholder='Name' value={name} onChange={event => setName(event.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
            <input type="phone" placeholder='Phone' value={phone} onChange={event => setPhone(event.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
          </div>
        }
        <button onClick={checkAuth}>{isLogin ? 'Login' : 'Register'}</button>
      </div>
      {isLogin ?
        <div>Still don't have an account? <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink></div>
        :
        <div>Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink></div>
      }
    </div>
  )
});