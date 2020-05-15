import React from 'react';
import './header.scss';

function Header({title}) {
  return (
    <header className="App">
        <h1>{title}</h1>
    </header>
  );
}

export default Header;
