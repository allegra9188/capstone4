export default async function fetchSenateData(){
    try {
        const response = await fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')

        if(!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const data = await response.json()

        return data;
    } catch(error) {
        console.error('Error fetching data: ', error.message);
        throw error;
    }
}
