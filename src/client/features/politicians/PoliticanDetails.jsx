import React from 'react'
import { useParams } from 'react-router-dom'

function PoliticanDetails() {
    const { id } = useParams();
    const { data: politician, isLoading, isError } = useGetPoliticianQuery(id)
    
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
      <section>
        <h2>{politician.name}</h2>
        <p>Party: {politician.party}</p>
        <p>Role: {politician.role}</p>
        <p>District: {politician.district}</p>
        <button onClick={handleSubmit}>Favorite</button>
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

export default PoliticanDetails