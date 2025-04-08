import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import HomePage from './Pages/HomePage/HomePage';
import Message from './Pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './theme/DarkTheme';

function App() {

  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  console.log("Auth -----", auth);
  

  useEffect(() => {
    dispatch(getProfileAction(jwt))
  }, [jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path='/message' element={<Message />} />
        <Route path='/*' element={<Authentication />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
