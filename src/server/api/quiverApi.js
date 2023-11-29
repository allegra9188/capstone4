// API base URL
const apiUrl = 'https://api.quiverquant.com';

// Function to fetch data from the Quiver Quant API
async function fetchData(endpoint, apiKey) {
  try {
    // Construct the full URL
    const url = `${apiUrl}/${endpoint}`;

    // Set up headers, including the API key if required
    const headers = {};
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }

    // Make the API request using fetch
    const response = await fetch(url, { headers });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Example usage:
// Replace 'YOUR_API_KEY' with your actual Quiver Quant API key
const apiKey = '1a553590ac3a1682d03bbf13426960c6772a371e';
const endpoint = '/beta/live/congresstrading'; // Replace with the specific API endpoint you want to access

// Call the fetchData function
fetchData(endpoint, apiKey)
  .then(data => {
    console.log('Data from Quiver Quant API:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
