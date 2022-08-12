import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import logo_black from '../../images/logo_black.png'
import './SignUpForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState([])
  const [passwordError, setPasswordError] = useState([])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleRedirect = ()=> {
    history.push('/sign-up')
  }


  useEffect(()=>{
    const emailErrorTemp= []
    const passwordErrorTemp= []

    errors.map((suberror)=>{
      const error = suberror.split(':');
      if (error[0] === 'email') emailErrorTemp.push('*' + error[1])
      if (error[0] === 'password') passwordErrorTemp.push('*' + error[1])
      setEmailError(emailErrorTemp)
      setPasswordError(passwordErrorTemp)

    })

  },[errors])

  const onLogin = async (e) => {
    e.preventDefault();
    setEmailError([])
    setPasswordError([])
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setErrors([])

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setErrors([])
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='sign-up-wrapper'>
    <img className='logo-signup' alt='logo' src={logo_black} />

    <form onSubmit={onLogin}
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
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          className='sign-up-input'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='signup-input-and-label'>
      <div className='errors'>
        {passwordError.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          className='sign-up-input'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <div className='button-holder'>
        <button className='sign-up-button' type='submit'>Log In</button>
      </div>
    </form>
    <div className='signup-redirect-container'>
    Don't have an account? <button onClick={handleRedirect} className='redirect-to-signup' type='button'>Sign-Up for NOT-ify</button>
    </div>
    <h2>Or</h2>
    <div className='demouser-container'>
     <button type='button' className='demo-button' onClick={demoUser}>Login as Demo User</button>
    </div>
    </div>
  );
};

export default LoginForm;
