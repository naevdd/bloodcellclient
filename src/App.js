import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import LoginForm from './components/LoginForm';
import './App.css';
import axios from 'axios';
import './Table.css';

const DataTable = ({ title, data, columns }) => (
  <div className="table-container">
    <h2>{title}</h2>
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{item[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout');
      setIsAdminLoggedIn(false);
      setActiveSection('intro');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      axios.get('http://localhost:5000/api/donor')
        .then(response => setDonors(response.data))
        .catch(error => console.error('Failed to fetch donors:', error));

      axios.get('http://localhost:5000/api/patient')
        .then(response => setPatients(response.data))
        .catch(error => console.error('Failed to fetch patients:', error));
    }
  }, [isAdminLoggedIn]);

  return (
    <div className="app">
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

      {isAdminLoggedIn && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}

      <div className="content">
        {activeSection === 'intro' && <LoginForm onLoginSuccess={() => setIsAdminLoggedIn(true)} />}
        {activeSection === 'donor' && <Form formType="donor" />}
        {activeSection === 'patient' && <Form formType="patient" />}

        {isAdminLoggedIn && (
          <div>
            <DataTable
              title="Donors"
              data={donors}
              columns={[
                { label: 'Name', field: 'name' },
                { label: 'Blood Type', field: 'bloodType' },
                { label: 'Phone Number', field: 'phone' },
              ]}
            />
            <DataTable
              title="Patients"
              data={patients}
              columns={[
                { label: 'Name', field: 'name' },
                { label: 'Blood Type', field: 'bloodType' },
                { label: 'Number of Units', field: 'units' },
                { label: 'Phone Number', field: 'phone' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;