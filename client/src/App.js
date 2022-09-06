import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import './App.scss';
import { AppRouter } from './components/AppRouter';
import { check } from './http/userApi';


const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(() => {
      user.setUser(true);
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  });

  if (loading) {
    return <p>загрузка...</p>
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
