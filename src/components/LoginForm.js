import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bloodcell-server.onrender.com/api/admin/login', { username, password });
      onLoginSuccess(); 
      setErrorMessage(''); 
    } catch (err) {
        console.log(err.response);
        setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
    <h1>WELCOME TO SFI BLOOD CELL</h1>
    <div className='form-container'>
      <h2 className='heading'>Admin Login</h2>
      <div>
      <form onSubmit={handleLogin}>
        <fieldset className='form-field'>
          <legend>Username</legend>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </fieldset>
        <fieldset className='form-field'>
          <legend>Password</legend>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </fieldset>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button className='login-button' type="submit">Login</button>
      </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
