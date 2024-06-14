import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = ({ setAuthenticatedUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();  

    if (role === 'admin' && email === 'swetham.22cse@kongu.edu' && password === 'swetha') {
      setAuthenticatedUser({ role: 'admin' });
      navigate('/admin');
    } else if (role === 'user' && email && password) {
      setAuthenticatedUser({ role: 'user' });
      navigate('/user');
    } else {
      alert('Invalid credentials or role not selected');
    }
  };

  return (
    <div className="container">
      <div className="heading">Login</div>
      <form className="form" onSubmit={handleLogin}>
        <div className="role-selector">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
          >
            <option value="" disabled>--select--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <input 
          required 
          className="input" 
          type="email" 
          name="email" 
          id="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          required 
          className="input" 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="login-button" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
