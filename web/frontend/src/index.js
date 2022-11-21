import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// styles
import './Styles/AuthenticationStyles.css';
import './Styles/MainStyles.css';
import './Styles/FooterStyles.css';
import './Styles/HeaderStyles.css';
import './Styles/AnimationStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);