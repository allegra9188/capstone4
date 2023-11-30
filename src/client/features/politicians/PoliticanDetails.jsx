import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPoliticianQuery } from './politicianSlice';
import { useSelector } from 'react-redux'
import { selectToken } from "../auth/authSlice";
import fetchHouseData from '../../../server/api/houseApi';
import fetchSenateData from '../../../server/api/senateApi';
import { useState, useEffect } from 'react';

import Transaction from './Transaction';
import './PoliticianDetails.less'


function PoliticanDetails() {
    const { id } = useParams();
    const token = useSelector(selectToken);
    const { data: politician, isLoading, isError } = useGetPoliticianQuery(id)
    const [houseData, setHouseData] = useState(null); // Initialize useState
    
    
    useEffect(() => {
      // Fetch house data
      fetchHouseData()
        .then((houseData) => {
          //console.log('Fetched House Data', houseData);
          
          setHouseData(houseData);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]); // Add dependencies to re-run effect when the ID changes

    const handleSubmit = (e) => {
        e.preventDefault();
        // will add function to add to favorite list once api is functional
        // need slice and connectivity to api and database
    }
    
    if (isLoading) {
        return <h1>Loading Politician...</h1>
    }
    //console.log('politician', politician)
    if (isError) {
        return <h1>Error loading data</h1>
    }

    // we need to check houseData is null or not
    const firstFiveTransaction = houseData
  ? houseData.filter((transaction) => {
      return (
          // so since house data do not separate first name and last name, we will do fullname.includes to filter the politician
          // and since District is not aline well, for example, on politician table, Nancy is District: HD-CA-11
          // but on transactions.cvs, Nancy is CA11, CA12, you can not use transaction.district === politician.district as conditional statement
          // it use nick name, for example, Mike Garcia is for Michael Garcia, we will need to do touch up later
        transaction.representative.includes(politician?.first_name) &&
        transaction.representative.includes(politician?.last_name)
      );
    }).slice(0,5) // slice to first 5 transactions
  : [];
      

  return (
    <>
      {token ? (
      <>
      <section>
        <h2>{politician?.first_name +" "+ politician.last_name}</h2>
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
      // not sign in
      <>
      <section>
        <h2>{politician?.first_name +" "+ politician?.last_name}</h2>
        <p>no token</p>
        <p>Party: {politician.party}</p>
        <p>Role: {politician.role}</p>
        <p>District: {politician.district}</p>
      </section>
      <br />
      <section>
      <h2>Recent House Transactions</h2>

        <ul className='politician-transaction-list'>
        {
          firstFiveTransaction?.map((transaction)=>(
            <Transaction ket ={transaction.id} transaction={transaction}/>
          ))
        }
      </ul>
    </section>
      </>
    )
}
    </>
  )
}

export default PoliticanDetails