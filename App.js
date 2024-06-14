
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Country from './components/Country';
import State from './components/State';
import City from './components/City';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const logout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <Router>
      <div className="App">
        <h1>Country State City Management</h1>
        <br></br>
        <Routes>
          <Route path="/login" element={<LoginPage setAuthenticatedUser={setAuthenticatedUser} />} />
          <Route path="/admin" element={
            authenticatedUser?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />
          } />
          <Route path="/user" element={
            authenticatedUser?.role === 'user' ? <UserPage /> : <Navigate to="/login" />
          } />
          <Route path="/countries" element={<Country />} />
          <Route path="/states" element={<State />} />
          <Route path="/cities" element={<City />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
