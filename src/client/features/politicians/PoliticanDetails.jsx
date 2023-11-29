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
  
    const filterTransactions = (data, firstName, lastName) => {
      if (!data) {
        return [];
      }
  
      return data.filter((transaction) => {
        return (
          transaction.representative === firstName && // Assuming representative corresponds to first_name
          transaction.last_name === lastName
        );
      });
    };
  
    const houseTransactions = filterTransactions(houseData, politician?.first_name, politician?.last_name);

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
        <h2>{politician.name}</h2>
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
        <h2>{politician.name}</h2>
        <p>Party: {politician.party}</p>
        <p>Role: {politician.role}</p>
        <p>District: {politician.district}</p>
      </section>
      <section>
        {/* 
        Recent trades will go here?
        Think that we could show what they have traded recently
        that way people will be able to see most recent trades on home
        and get recent trades by politician here.
        Should we limit it to last 3 trades or more?
        */}
      </section>
      </>
    )
}
    </>
  )
}

export default PoliticanDetails