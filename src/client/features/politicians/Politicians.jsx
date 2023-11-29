import React from 'react'
import PolitcianCard from './PolitcianCard'
import { useGetPoliticiansQuery } from './politicianSlice';

export default function Politicians() {
  // useGetPoliticiansQuery() is currently a placeholder
  // will update once we get the slice, api, and endpoints up and running
  // aware that below deconstructions is undefined and will cause error
  const { data: politicians, isLoading } = useGetPoliticiansQuery();

  return ( isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <main>
      <h1>Politicians</h1>
      <ul>
        {
          [...politicians].map((politician) => (
            <PolitcianCard key={politician.id} politician={politician} />
          ))
        }
      </ul>
    </main>
  ))
}
