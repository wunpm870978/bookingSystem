import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import './index.module.scss';
import 'animate.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);