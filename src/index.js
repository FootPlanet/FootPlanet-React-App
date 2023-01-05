import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider deferLoading={true}>
    <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
