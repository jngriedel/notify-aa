import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist'
import Playlist from './components/Playlist/Playlist';
import ProfileButton from './components/ProfileButton/ProfileButton';
import Splash from './components/Splash/Splash.js'
import Search from './components/Search/Search';
import LikedSongs from './components/LikedSongs/LikedSongs';
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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <div id='content-wrapper'>
          <Switch>

          <ProtectedRoute path='/profile' exact={true} >
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/createplaylist' exact={true} >
            <CreatePlaylist />
          </ProtectedRoute>
          <ProtectedRoute path='/likes' exact={true} >
            <LikedSongs />
          </ProtectedRoute>
          <ProtectedRoute path='/playlists/:playlistId' exact={true} >
            <Playlist />
          </ProtectedRoute>

          <ProtectedRoute path='/home' exact={true}  >
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path='/search' exact={true}  >
            <Search />
          </ProtectedRoute>

          <ProtectedRoute>
          <NotFound />
          </ProtectedRoute>
        </Switch>
        </div>



      </Switch>
    </BrowserRouter>
  );
}

export default App;
