import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import logo_black from '../../images/logo_black.png'
import './SignUpForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleRedirect = ()=> {
    history.push('/sign-up')
  }

  const onLogin = async (e) => {
    e.preventDefault();
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
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='sign-up-wrapper'>
    <img className='logo-signup' alt='logo' src={logo_black} />

    <form onSubmit={onLogin}
    className='sign-up-form'>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup-input-and-label'>
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
