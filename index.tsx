import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import Start from './Start';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Start/>
    {/* <App></App> */}
  </React.StrictMode>
);