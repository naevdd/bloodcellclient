import React from 'react';
import './Header.css';

const Header = ({ activeSection, onSectionChange }) => {
  return (
    <header className="header">
      <nav className="nav">
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
      </nav>
    </header>
  );
};

export default Header;
