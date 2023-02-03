import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from '../components/Nav';
import Login from '../components/Login/Login';

import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';

const Root = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>

        {isLogin ? <Nav setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />}
      
      </ThemeProvider>
    </>
  );
};

export default Root;
