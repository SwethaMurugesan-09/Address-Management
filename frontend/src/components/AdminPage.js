import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div style={styles.adminPage}>
      <h2 style={styles.heading}>Admin Page</h2>
      <p style={styles.paragraph}>Welcome, Admin! You can add, edit, and delete records here.</p>
      <div style={styles.buttonContainer}>
        <Link to="/countries">
          <button style={styles.button}>Manage Countries</button>
        </Link>
        <Link to="/states">
          <button style={styles.button}>Manage States</button>
        </Link>
        <Link to="/cities">
          <button style={styles.button}>Manage Cities</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  adminPage: {
    maxWidth: '800px', // Increase the maxWidth
    margin: 'auto',
    padding: '40px', // Increase the padding
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  paragraph: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminPage;
