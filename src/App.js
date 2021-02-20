import React from 'react';
import logo from './logo.svg';

import AppRouter from './routers/AppRouter.js'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">

      <Header />
      <AppRouter />
      
    </div>
  );
}

export default App;
