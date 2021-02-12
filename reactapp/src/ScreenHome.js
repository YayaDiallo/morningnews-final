import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Input, Button, Alert } from 'antd';
import { Redirect } from 'react-router-dom';

function ScreenHome({ onAddToken }) {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [userExists, setUserExists] = useState(false);

  const [listErrorsSignin, setErrorsSignin] = useState([]);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  const handleSubmitSignup = async () => {
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json();

    if (body.result === true) {
      onAddToken(body.token);
      setUserExists(true);
    } else {
      setErrorsSignup(body.error);
    }
  };

  const handleSubmitSignin = async () => {
    // const data = await fetch('/sign-in', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    // });
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailFromFront: signInEmail,
        passwordFromFront: signInPassword,
      }),
    });

    const body = await data.json();

    if (body.result === true) {
      onAddToken(body.tokenSignIn);
      setUserExists(true);
    } else {
      setErrorsSignin(body.error);
    }
  };

  if (userExists) {
    return <Redirect to='/screensource' />;
  }

  const tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return <Alert key={i} message={error} type='error' />;
  });

  const tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <Alert key={i} message={error} type='error' />;
  });

  return (
    <div className='Login-page'>
      {/* SIGN-IN */}
      <div className='Sign'>
        <Input
          onChange={(e) => setSignInEmail(e.target.value)}
          className='Login-input'
          placeholder='email'
        />
        <Input.Password
          onChange={(e) => setSignInPassword(e.target.value)}
          className='Login-input'
          placeholder='password'
        />
        {tabErrorsSignin}
        <Button
          onClick={() => handleSubmitSignin()}
          style={{ width: '80px' }}
          type='primary'
        >
          Sign-in
        </Button>
      </div>
      {/* SIGN-UP */}
      <div className='Sign'>
        <Input
          onChange={(e) => setSignUpUsername(e.target.value)}
          className='Login-input'
          placeholder='username'
        />
        <Input
          onChange={(e) => setSignUpEmail(e.target.value)}
          className='Login-input'
          placeholder='email'
        />
        <Input.Password
          onChange={(e) => setSignUpPassword(e.target.value)}
          className='Login-input'
          placeholder='password'
        />
        {tabErrorsSignup}
        <Button
          onClick={() => handleSubmitSignup()}
          style={{ width: '80px' }}
          type='primary'
        >
          Sign-up
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToken: (token) => {
      dispatch({ type: 'addToken', token });
    },
  };
};

export default connect(null, mapDispatchToProps)(ScreenHome);
