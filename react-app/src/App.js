import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
// import UploadSong from './components/UploadSong/UploadSong';
import Profile from './components/Profile/Profile'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist'
import Playlist from './components/Playlist/Playlist';
import ProfileButton from './components/ProfileButton/ProfileButton';
import Splash from './components/Splash/Splash.js'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <NavBar />
      <ProfileButton />
      <MusicPlayer />

      <Switch>

        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <div id='content-wrapper'>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>

          {/* <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute> */}

          <ProtectedRoute path='/home' exact={true} >
            <h1>Home Page</h1>
          </ProtectedRoute>
          <ProtectedRoute path='/profile' exact={true} >
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/createplaylist' exact={true} >
            <CreatePlaylist />
          </ProtectedRoute>
          <ProtectedRoute path='/playlists/:playlistId' exact={true} >
            <Playlist />
          </ProtectedRoute>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
