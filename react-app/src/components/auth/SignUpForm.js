import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import logo_black from '../../images/logo_black.png'
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState([])
  const [usernameError, setUsernameError] = useState([])
  const [passwordError, setPasswordError] = useState([])
  const [repeatPasswordError, setRepeatPasswordError] = useState([])


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const emailErrorTemp= []
    const usernameErrorTemp= []
    const passwordErrorTemp= []
    const repeatPasswordErrorTemp= []

    errors.map((suberror)=>{
      const error = suberror.split(':');
      if (error[0] === 'email') emailErrorTemp.push('*' + error[1])
      if (error[0] === 'username') usernameErrorTemp.push('*' + error[1])
      if (error[0] === 'password') passwordErrorTemp.push('*' + error[1])
      if (error[0] === 'repeat_password') repeatPasswordErrorTemp.push('*' +error[1])
      setEmailError(emailErrorTemp)
      setUsernameError(usernameErrorTemp)
      setPasswordError(passwordErrorTemp)
      setRepeatPasswordError(repeatPasswordErrorTemp)

    })

  },[errors])

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
    // }
    // else {
    //   setErrors(['*Passwords must match.'])
    // }
  };

  const demoUser = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
  <div className='sign-up-wrapper'>
    <img className='logo-signup' alt='logo' src={logo_black} />
    <h2 className='signup-message'>Sign Up to Start Listening!</h2>
    <form onSubmit={onSignUp}
    className='sign-up-form'>
      {/* <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

      <div className='signup-input-and-label'>
      <div className='errors'>
        {emailError.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <label className='sign-up-input-label'>What's your email? { email.length >= 245 && <span className='limit-warning' >{email.length}/255</span> }</label>
        <input
          type='text'
          className='sign-up-input'
          placeholder='Enter your email'
          maxLength="255"
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='signup-input-and-label'>
      <div className='errors'>
        {usernameError.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <label className='sign-up-input-label'>What should we call you? { username.length >= 30 && <span className='limit-warning' >{username.length}/40</span> }</label>
        <input
          type='text'
          className='sign-up-input'
          placeholder='Enter a username'
          maxLength="40"
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='signup-input-and-label'>
      <div className='errors'>
        {passwordError.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <label className='sign-up-input-label'>Create a Password</label>
        <input
          type='password'
          className='sign-up-input'
          placeholder='Create a password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='signup-input-and-label'>
      <div className='errors'>
        {repeatPasswordError.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <label className='sign-up-input-label'>Confirm Password</label>
        <input
          type='password'
          className='sign-up-input'
          placeholder='Repeat password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='button-holder'>
        <button className='sign-up-button' type='submit'>Sign Up</button>
      </div>
    </form>
    <div className='login-redirect-container'>
    Have an account? <NavLink className='sign-up-redirect' to='/login'>Login</NavLink>
    </div>
     <h2>Or</h2>
    <div className='demouser-container'>
     <button type='button' className='demo-button' onClick={demoUser}>Login as Demo User</button>
    </div>
  </div>
  );
};

export default SignUpForm;
