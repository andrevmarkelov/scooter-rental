import { $authHost, $host } from './index';
import jwtDecode from 'jwt-decode';


export const register = async (name, email, phone, password) => {
  const { data } = await $host.post('api/user/registration', { name, email, phone, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const fetchUsers = async () => {
  const { data } = await $host.get('api/user/admin');
  return data;
}