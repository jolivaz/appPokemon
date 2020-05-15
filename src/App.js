import React, {useState} from 'react'
import Header from './components/header/header'
import Routes from './routes'
import './App.scss';

function App() {
  return (
    <div className="app">
        <Header title={'APP POKEMON'} />
        <div className="main">
          <Routes />
        </div>
    </div>
  );
}

export default App;
