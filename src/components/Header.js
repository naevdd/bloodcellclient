import React from 'react';
import './Header.css';
import reactlogo from '../logobloodcell.png';

const Header = ({ activeSection, onSectionChange }) => {
  return (
    <header className="header">
      <nav className="nav">
      <img src={reactlogo}  width='50' height='50' className="logo" alt="logo"></img>
      <div className="divnav">
        <button
          className={`nav-button ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={() => onSectionChange('intro')}
        >
          INTRO
        </button>
        <button
          className={`nav-button ${activeSection === 'donor' ? 'active' : ''}`}
          onClick={() => onSectionChange('donor')}
        >
          DONOR
        </button>
        <button
          className={`nav-button ${activeSection === 'patient' ? 'active' : ''}`}
          onClick={() => onSectionChange('patient')}
        >
          PATIENT
        </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
