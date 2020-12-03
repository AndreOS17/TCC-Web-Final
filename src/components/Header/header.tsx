import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default function Header() {
  return (
    <header className="mainHeader">
      <Link to='/' className='Title'>Light Source</Link>
    </header>
  );
}