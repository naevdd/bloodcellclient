import React, { useState } from 'react';
import './Form.css';

const Form = ({ formType }) => {
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    phone: '',
    units: formType === 'patient' ? '' : null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === 'patient' ? 'patient' : 'donor';
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <fieldset className="form-field">
          <legend>Name</legend>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </fieldset>

        <fieldset className="form-field">
          <legend>Blood type</legend>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </fieldset>

        {formType === 'patient' && (
          <fieldset className="form-field">
            <legend>Number of units</legend>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleChange}
              required
            />
          </fieldset>
        )}

        <fieldset className="form-field">
          <legend>Phone number</legend>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </fieldset>

        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>
  );
};

export default Form;