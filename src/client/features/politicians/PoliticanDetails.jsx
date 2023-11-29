import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPoliticianQuery } from './politicianSlice';
import { useSelector } from 'react-redux'
import { selectToken } from "../auth/authSlice";
import fetchHouseData from '../../../server/api/houseApi';
import fetchSenateData from '../../../server/api/senateApi';
import { useState, useEffect } from 'react';

function PoliticanDetails() {
    const { id } = useParams();
    const token = useSelector(selectToken);
    const { data: politician, isLoading, isError } = useGetPoliticianQuery(id)
    const [houseData, setHouseData] = useState(null); // Initialize useState
    
    useEffect(() => {
      // Fetch house data
      fetchHouseData()
        .then((houseData) => {
          console.log('Fetched House Data', houseData);
          setHouseData(houseData);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]); // Add dependencies to re-run effect when the ID changes
    
    // const test1data = houseData[0][1];
    // console.log('Testing: ', test1data)

    const filterTransactions = (data, firstName, lastName) => {
      if (!data) {
        return [];
      }
    
      return data
        .filter((transaction) => {
          return (
            transaction.representative === firstName &&
            transaction.last_name === lastName
          );
        })
        .slice(0, 5) // Limit to 5 most recent transactions;
    };
  
    const houseTransactions = filterTransactions(
      houseData,
      politician?.first_name,
      politician?.last_name
    );

    console.log('This is house transactions: ', houseTransactions)

    const handleSubmit = (e) => {
        e.preventDefault();
        // will add function to add to favorite list once api is functional
        // need slice and connectivity to api and database
    }
    
    if (isLoading) {
        return <h1>Loading Politician...</h1>
    }

    if (isError) {
        return <h1>Error loading data</h1>
    }

  return (
    <>
      {token ? (
      <>
      <section>
        <h2>{politician.first_name +" "+ politician.last_name}</h2>
        <p>Party: {politician.party}</p>
        <p>Role: {politician.role}</p>
        <p>District: {politician.district}</p>
        <button onClick={handleSubmit}>Favorite</button>
      </section>
      <section>
      {
          // if fetchSenate first name && last name === politician.first_name && politician.lastname
          // limit to 5 most recent transactions
          // return transaction date, disclosure date owner, ticker, asset description, asset type, type, amount, industry, sector
          // if fetchHouse first name && last name === politician.first_name && politician.lastname
          // return transaction date, disclosure date owner, ticker, asset description, asset type, type, amount, industry, sector
        }
      </section>
      </>
    ): (
      <>
      <section>
        <h2>{politician.first_name +" "+ politician.last_name}</h2>
        <p>Party: {politician.party}</p>
        <p>Role: {politician.role}</p>
        <p>District: {politician.district}</p>
      </section>
      <br />
      <section>
      <h2>Recent House Transactions</h2>
      <ul>
        {houseTransactions.map((transaction, index) => (
          <li key={index}>
            <p>Transaction Date: {transaction.transaction_date}</p>
            <p>Disclosure Date: {transaction.disclosure_date}</p>
            <p>Owner: {transaction.owner}</p>
            <p>Ticker: {transaction.ticker}</p>
            <p>Asset Description: {transaction.asset_description}</p>
            <p>Asset Type: {transaction.type}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Industry: {transaction.industry}</p>
            <p>Sector: {transaction.sector}</p>
          </li>
        ))}
      </ul>
    </section>
      </>
    )
}
    </>
  )
}

export default PoliticanDetails