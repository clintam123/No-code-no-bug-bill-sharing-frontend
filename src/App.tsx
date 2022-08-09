import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routing/Routing';
import Login from './modules/auth/component/Login';
import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Login />

      <Routing />
    </BrowserRouter>
  );
}

export default App;
