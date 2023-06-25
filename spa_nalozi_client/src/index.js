import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import style from "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);

