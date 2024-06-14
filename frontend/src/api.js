const baseUrl = 'http://localhost:5000/api'; // Replace with your backend API URL
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
  }
  return response.json();
};

// Country API calls
export const getCountries = async () => {
  const response = await fetch(`${baseUrl}/countries`);
  return handleResponse(response);
};

export const getStatesByCountryId = async (countryId) => {
  const response = await fetch(`${baseUrl}/states/${countryId}`);
  return handleResponse(response);
};

export const getCitiesByStateId = async (stateId) => {
  const response = await fetch(`${baseUrl}/cities/${stateId}`);
  return handleResponse(response);
};

export const addCountry = async (name) => {
  const response = await fetch(`${baseUrl}/countries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return handleResponse(response);
};

export const updateCountry = async (id, name) => {
  const response = await fetch(`${baseUrl}/countries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return handleResponse(response);
};

export const deleteCountry = async (id) => {
  const response = await fetch(`${baseUrl}/countries/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// State API calls
export const getStates = async () => {
  const response = await fetch(`${baseUrl}/states`);
  return handleResponse(response);
};



export const addState = async (name, countryId) => {
  const response = await fetch(`${baseUrl}/states`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, countryId }),
  });
  return handleResponse(response);
};

export const updateState = async (id, name, countryId) => {
  const response = await fetch(`${baseUrl}/states/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, countryId }),
  });
  return handleResponse(response);
};

export const deleteState = async (id) => {
  const response = await fetch(`${baseUrl}/states/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// City API calls
export const getCities = async () => {
  const response = await fetch(`${baseUrl}/cities`);
  return handleResponse(response);
};


export const addCity = async (name, stateId) => {
  const response = await fetch(`${baseUrl}/cities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, stateId }),
  });
  return handleResponse(response);
};

export const updateCity = async (id, name, stateId) => {
  const response = await fetch(`${baseUrl}/cities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, stateId }),
  });
  return handleResponse(response);
};

export const deleteCity = async (id) => {
  const response = await fetch(`${baseUrl}/cities/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
