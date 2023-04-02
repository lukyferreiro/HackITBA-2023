import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "./styles/global.css";
import "./styles/form.css";
import "./styles/cardRecipe.css"; 
import "./styles/modalRecipe.css"; 

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
