import React, { useState, useEffect } from 'react';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../api';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState('');
  const [editCountryId, setEditCountryId] = useState(null);
  const [editCountryName, setEditCountryName] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      const newCountry = await addCountry(newCountryName);
      setCountries([...countries, newCountry]);
      setNewCountryName('');
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleUpdateCountry = async (id) => {
    try {
      const updatedCountry = await updateCountry(id, editCountryName);
      setCountries(countries.map(country => (country._id === id ? updatedCountry : country)));
      setEditCountryId(null);
      setEditCountryName('');
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      setCountries(countries.filter(country => country._id !== id));
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className="country-container">
      <style>{`
        .country-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin-top: 20px;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        li span {
          flex-grow: 1;
        }
        li div {
          display: flex;
          gap: 5px;
        }
        .edit-button {
          background-color: #ffc107;
          margin-right:30px;
        }
        .edit-button:hover {
          background-color: #e0a800;
        }
        .delete-button {
          background-color: #dc3545;
        }
        .delete-button:hover {
          background-color: #c82333;
        }
        .save-button {
          background-color: #28a745;
        }
        .save-button:hover {
          background-color: #218838;
        }
        .cancel-button {
          background-color: #6c757d;
        }
        .cancel-button:hover {
          background-color: #5a6268;
        }
      `}</style>
      <h2>Countries</h2>
      <form onSubmit={handleAddCountry}>
        <input
          type="text"
          value={newCountryName}
          onChange={(e) => setNewCountryName(e.target.value)}
          placeholder="Add new country"
          required
        />
        <button type="submit">Add Country</button>
      </form>
      <ul>
        {countries.map(country => (
          <li key={country._id}>
            {editCountryId === country._id ? (
              <>
                <input
                  type="text"
                  value={editCountryName}
                  onChange={(e) => setEditCountryName(e.target.value)}
                />
                <button className="save-button" onClick={() => handleUpdateCountry(country._id)}>Save</button>
                <button className="cancel-button" onClick={() => setEditCountryId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{country.name}</span>
                <div>
                  <button className="edit-button" onClick={() => {
                    setEditCountryId(country._id);
                    setEditCountryName(country.name);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCountry(country._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Country;
