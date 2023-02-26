import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import globalReducer from 'state'
import { Provider } from 'react-redux';
import { api } from 'state/api';
import { MsalProvider } from '@azure/msal-react'; 
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from "./authConfig";



const msalInstance = new PublicClientApplication(msalConfig);


const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <Provider store={store}>
    <App />
    </Provider>
    </MsalProvider>
  </React.StrictMode>
);
