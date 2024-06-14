import React, { useState, useEffect, useRef } from 'react';
import { getCities, addCity, updateCity, deleteCity, getStates, getCountries } from '../api'; // Add getCountries import

const City = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newCityName, setNewCityName] = useState('');
  const [newCityStateId, setNewCityStateId] = useState('');
  const [newCityCountryId, setNewCityCountryId] = useState('');
  const [editCityId, setEditCityId] = useState(null);
  const [editCityName, setEditCityName] = useState('');
  const [editCityStateId, setEditCityStateId] = useState('');
  const [editCityCountryId, setEditCityCountryId] = useState('');
  const [filteredCountryId, setFilteredCountryId] = useState('');
  const [filteredStateId, setFilteredStateId] = useState('');
  const containerRef = useRef(null); // Ref for the container

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    const fetchCountries = async () => {
      try {
        const data = await getCountries(); // Fetch countries
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCities();
    fetchStates();
    fetchCountries(); // Fetch countries on mount
  }, []);

  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      const newCity = await addCity(newCityName, newCityStateId);
      setCities([...cities, newCity]);
      setNewCityName('');
      setNewCityStateId('');
      setNewCityCountryId('');
      scrollToTop(); // Scroll to top after adding city
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const handleUpdateCity = async (id) => {
    try {
      const updatedCity = await updateCity(id, editCityName, editCityStateId);
      setCities(cities.map(city => (city._id === id ? updatedCity : city)));
      setEditCityId(null);
      setEditCityName('');
      setEditCityStateId('');
      setEditCityCountryId('');
      scrollToTop(); // Scroll to top after updating city
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await deleteCity(id);
      setCities(cities.filter(city => city._id !== id));
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const getStateName = (stateId) => {
    const state = states.find(state => state._id === stateId);
    return state ? state.name : '';
  };

  const handleFilterByCountry = (countryId) => {
    setFilteredCountryId(countryId);
    setFilteredStateId(''); // Clear state filter when country changes
  };

  const handleFilterByState = (stateId) => {
    setFilteredStateId(stateId);
  };

  const clearFilter = () => {
    setFilteredCountryId('');
    setFilteredStateId('');
  };

  const filteredStates = filteredCountryId ? states.filter(state => state.countryId === filteredCountryId) : states;
  const filteredCities = filteredStateId ? cities.filter(city => city.stateId === filteredStateId) : cities;

  const scrollToTop = () => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="container">
      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .filter-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .filter-container select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          flex-grow: 1;
          margin-right: 10px;
        }

        .filter-container button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .filter-container button:hover {
          background-color: #0056b3;
        }

        form {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        form input[type="text"],
        form select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        form button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        form button:hover {
          background-color: #218838;
        }

        ul {
          max-height: 400px;
          overflow-y: auto;
          list-style: none;
          padding: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        li:nth-child(even) {
          background-color: #e9ecef;
        }

        button {
          padding: 5px 10px;
          margin-left: 5px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button {
          background-color: #007bff;
          color: white;
          margin-right: 20px;
        }

        .edit-button:hover {
          background-color: #0056b3;
        }

        .delete-button {
          background-color: #dc3545;
          color: white;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .edit-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .edit-container input,
        .edit-container select {
          margin-right: 10px;
          flex: 1;
        }
      `}</style>

      <h2>Cities</h2>

      <div className="filter-container">
        <select value={filteredCountryId} onChange={(e) => handleFilterByCountry(e.target.value)}>
          <option value="">All Countries</option>
          {countries.map(country => (
            <option key={country._id} value={country._id}>{country.name}</option>
          ))}
        </select>
        <select value={filteredStateId} onChange={(e) => handleFilterByState(e.target.value)}>
          <option value="">All States</option>
          {filteredStates.map(state => (
            <option key={state._id} value={state._id}>{state.name}</option>
          ))}
        </select>
        {(filteredCountryId || filteredStateId) && (
          <button onClick={clearFilter}>Clear Filter</button>
        )}
      </div>

      <form onSubmit={handleAddCity}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Add new city"
            required
          />
          <select value={newCityCountryId} onChange={(e) => setNewCityCountryId(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country._id} value={country._id}>{country.name}</option>
            ))}
          </select>
          <select value={newCityStateId} onChange={(e) => setNewCityStateId(e.target.value)} required>
            <option value="">Select State</option>
            {states.filter(state => state.countryId === newCityCountryId).map(state => (
              <option key={state._id} value={state._id}>{state.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add City</button>
      </form>

      <ul>
        {filteredCities.map(city => (
          <li key={city._id}>
            {editCityId === city._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editCityName}
                  onChange={(e) => setEditCityName(e.target.value)}
                />
                <select
                  value={editCityCountryId}
                  onChange={(e) => {
                    setEditCityCountryId(e.target.value);
                    setEditCityStateId(''); // Clear state selection when country changes
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country._id} value={country._id}>{country.name}</option>
                  ))}
                </select>
                <select
                  value={editCityStateId}
                  onChange={(e) => setEditCityStateId(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.filter(state => state.countryId === editCityCountryId).map(state => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
                <button className="edit-button" onClick={() => handleUpdateCity(city._id)}>Save</button>
                <button className="delete-button" onClick={() => setEditCityId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {city.name} - {getStateName(city.stateId)}
                <div>
                  <button className="edit-button" onClick={() => {
                    setEditCityId(city._id);
                    setEditCityName(city.name);
                    setEditCityCountryId(city.countryId);
                    setEditCityStateId(city.stateId);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCity(city._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default City;
