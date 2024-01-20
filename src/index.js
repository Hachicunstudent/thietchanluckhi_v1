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

// Kiểm tra nếu Service Worker được hỗ trợ
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                // Đăng ký thành công
                console.log('Service Worker registered: ', registration);
            })
            .catch(registrationError => {
                // Đăng ký thất bại
                console.log('Service Worker registration failed: ', registrationError);
            });
    });
}
