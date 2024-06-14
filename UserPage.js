import React, { useEffect, useState } from 'react';
import { getCountries, getStatesByCountryId, getCitiesByStateId } from '../api';

const UserPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries();
        setCountries(countries);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const states = await getStatesByCountryId(selectedCountry);
          setStates(states);
          setCities([]);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const cities = await getCitiesByStateId(selectedState);
          setCities(cities);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  return (
    <div className="user-page-container">
      <style>{`
        .user-page-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .error-message {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
      <h1>User Page</h1>
      {error && <div className="error-message">Error: {error}</div>}
      <div className="form-group">
        <label>Country: </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>State: </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>City: </label>
        <select disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserPage;
