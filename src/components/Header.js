import React from 'react';
import './Header.css';
import reactlogo from '../logobloodcell.png';

const Header = ({ activeSection, onSectionChange }) => {
  return (
    <>
    <nav className="nav">
      <div className='divlogo'>
          <img src={reactlogo} alt='logo' class='logo'/>
      </div>
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
    </>
  );
};

export default Header;
