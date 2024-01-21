//index.js
// code setup worker từ src.nhưng không thành công
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
          console.log('Service Worker Registered!', registration);
      }, function(err) {
          console.log('Service Worker registration failed: ', err);
      });
  });
}
