export default async function fetchQuiverData() {
  const baseURL = 'https://api.quiverquant.com';
  const token = '1a553590ac3a1682d03bbf13426960c6772a371e';
  const endpoint = '/beta/live/congresstrading';
  const url = baseURL + endpoint;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('QuiverQuant API response: ', data);
    return data;
  } catch (error) {
    console.error('Error fetching QuiverQuant data: ', error.message);
    throw error;
  }
}
