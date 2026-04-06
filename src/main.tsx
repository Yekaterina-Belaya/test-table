import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/inter';
import './normalize.scss';
import './index.scss';
import './styles/fonts.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
