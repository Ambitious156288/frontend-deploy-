import { useState } from 'react';
import axios from 'axios';

const useLogin = ({ setIsLogin }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [onLogin, setOnLogin] = useState(true);

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
  };

  const registerSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/register', {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: '', email: '', password: '' });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/users/login', {
        email: user.email,
        password: user.password,
      });
      setUser({ name: '', email: '', password: '' });
      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);
      window.location.reload(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

    return { 
        loginSubmit,
        user, 
        onChangeInput,
        onLogin, 
        setOnLogin, 
        err,
        registerSubmit
    };
};

export default useLogin;