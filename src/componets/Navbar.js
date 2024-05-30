import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">Utenti</Link></li>
        <li><Link to="/register">Registrati</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
