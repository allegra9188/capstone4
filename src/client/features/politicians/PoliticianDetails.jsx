import React from "react";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./politicianSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import PoliticianRecentTrade from "./politicianRecentTrade";
import "./PoliticianDetails.less";
import TradeActivityChecker from "./TradeActivityChecker";

function PoliticianDetails() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    // will add function to add to favorite list once api is functional
    // need slice and connectivity to api and database
  };

  if (isLoading) {
    return <h1>Loading Politician...</h1>;
  }
  //console.log('politician', politician)
  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <>
      {token ? (
        <>
          <section>
            <h2>{politician?.first_name + " " + politician.last_name}</h2>
            <p>Party: {politician.party}</p>
            <p>Role: {politician.role}</p>
            <p>District: {politician.district}</p>
            <button className="favButton" onClick={handleSubmit}>
              Favorite
            </button>
          </section>
          <PoliticianRecentTrade />
        </>
      ) : (
        // not signed in
        <>
          <section>
            <h2>{politician?.first_name + " " + politician?.last_name}</h2>
            <p>no token</p>
            <p>Party: {politician.party}</p>
            <p>Role: {politician.role}</p>
            <p>District: {politician.district}</p>
          </section>
          <br />
          <PoliticianRecentTrade />
        </>
      )}
    </>
  );
}

export default PoliticianDetails;
