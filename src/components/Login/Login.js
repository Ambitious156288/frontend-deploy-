import React from 'react';

import SignIn from 'components/Login/Register/SignIn';
import SignUp from 'components/Login/Register/SignUp'

import {StyledCenter, StyledOpacity, Styledh1} from './Login.styles.js'
import useLogin from './useLogin.hook.js'

export default function Login({ setIsLogin }) {
    const {         
          loginSubmit,
          user, 
          onChangeInput,
          onLogin, 
          setOnLogin, 
          err,
          registerSubmit 
        } = useLogin({ setIsLogin });

  return (
    <StyledOpacity>
      <StyledCenter>
        <Styledh1>Data and metadata APP</Styledh1>

        {onLogin ?
          <SignIn onSubmit={loginSubmit} EmailValue={user.email} PasswordValue={user.password} onChange={onChangeInput} onClick={() => setOnLogin(!onLogin)} err={err} />

          :

          <SignUp onSubmit={registerSubmit} NameValue={user.name} EmailValue={user.email} PasswordValue={user.password} onChange={onChangeInput} onClick={() => setOnLogin(!onLogin)} err={err} />
        }

      </StyledCenter>
    </StyledOpacity>
  );
}
