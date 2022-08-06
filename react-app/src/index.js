import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import MusicProvider from './components/context/MusicContext';
import { ModalProvider } from './components/context/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <ModalProvider>
     <MusicProvider>
        <App />
      </MusicProvider>
     </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
