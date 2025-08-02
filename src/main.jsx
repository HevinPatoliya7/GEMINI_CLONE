import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css';
import App from './App.jsx'; 
import ContextProvider from './componensts/context/Context';

ReactDom.createRoot(document.getElementById('root')).render(
<ContextProvider>
    <App />
  </ContextProvider>,
)
