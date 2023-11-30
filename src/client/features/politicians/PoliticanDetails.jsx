import React from "react";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./politicianSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import PoliticianRecentTrade from "./politicianRecentTrade";
import "./PoliticianDetails.less";

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
      ) : (
        // not sign in
        <>
          <section>
            <h2>{politician?.first_name + " " + politician?.last_name}</h2>
            <p>no token</p>
            <p>Party: {politician.party}</p>
            <p>Role: {politician.role}</p>
            <p>District: {politician.district}</p>
          </section>
          <br />
          {/* <section>
            <h2>Recent House Transactions</h2>

            <ul className="politician-transaction-list">
              {firstFiveTransaction?.map((transaction) => (
                <Transaction ket={transaction.id} transaction={transaction} />
              ))}
            </ul>
            <h2>Recent Senate Transactions</h2>

            <ul className="politician-senate-transaction-list">
              {firstFiveSenateTransactions?.map((transaction) => (
                <Transaction ket={transaction.id} transaction={transaction} />
              ))}
            </ul>
          </section> */}
          <PoliticianRecentTrade />
        </>
      )}
    </>
  );
}

export default PoliticianDetails;
