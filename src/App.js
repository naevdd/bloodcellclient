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
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://bloodcell-server.onrender.com/api/admin/logout');
      setIsAdminLoggedIn(false);
      setActiveSection('intro');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      axios.get('https://bloodcell-server.onrender.com/api/donor')
        .then(response => setDonors(response.data))
        .catch(error => console.error('Failed to fetch donors:', error));

      axios.get('https://bloodcell-server.onrender.com/api/patient')
        .then(response => setPatients(response.data))
        .catch(error => console.error('Failed to fetch patients:', error));
    }
  }, [isAdminLoggedIn]);

  const filteredDonors = donors.filter(donor => 
    selectedBloodGroup === '' || donor.bloodType === selectedBloodGroup
  );

  const filteredPatients = patients.filter(patient => 
    selectedBloodGroup === '' || patient.bloodType === selectedBloodGroup
  );

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
            <div className="filter-container">
              <br/>
              <label htmlFor="bloodGroup">Filter by Blood Group: </label>
              <select
                id="bloodGroup"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
              >
                <option value="">All</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <DataTable
              title="Donors"
              data={filteredDonors}
              columns={[
                { label: 'Name', field: 'name' },
                { label: 'Blood Type', field: 'bloodType' },
                { label: 'Phone Number', field: 'phone' },
              ]}
            />
            <DataTable
              title="Patients"
              data={filteredPatients}
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