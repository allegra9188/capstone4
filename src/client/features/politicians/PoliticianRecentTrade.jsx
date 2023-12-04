import React from "react";
import Transaction from "./Transaction";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./politicianSlice";
import { useGetSenateDataQuery } from "./senateApiSlice";
import { useGetHouseDataQuery } from "./houseApiSlice";
import "./PoliticianDetails.less";

function PoliticianRecentTrade() {
  const { id } = useParams();
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);
  const { data: senateTrades } = useGetSenateDataQuery();
  const { data: houseTrades } = useGetHouseDataQuery();
  console.log(houseTrades);

  const firstFiveTransaction = houseTrades
    ? houseTrades
        .filter((transaction) => {
          return (
            // so since house data do not separate first name and last name, we will do fullname.includes to filter the politician
            // and since District is not aline well, for example, on politician table, Nancy is District: HD-CA-11
            // but on transactions.cvs, Nancy is CA11, CA12, you can not use transaction.district === politician.district as conditional statement
            // it use nick name, for example, Mike Garcia is for Michael Garcia, we will need to do touch up later
            transaction.representative.includes(politician?.first_name) &&
            transaction.representative.includes(politician?.last_name)
          );
        })
        .slice(0, 5) // slice to first 5 transactions
    : [];

  const firstFiveSenateTransactions = senateTrades
    ? senateTrades
        .filter((transaction) => {
          return (
            transaction.senator.includes(politician?.first_name) &&
            transaction.senator.includes(politician?.last_name)
          );
        })
        .slice(0, 5) // slice to first 5 transactions
    : [];

  if (isLoading) {
    return <h1>Loading Politician...</h1>;
  }
  //console.log('politician', politician)
  if (isError) {
    return <h1>Error loading data</h1>;
  }
  const checkActivity = () => {
    if (Array.isArray(houseTrades) && Array.isArray(senateTrades)) {
      return houseTrades.length === 0 && senateTrades.length === 0
        ? "Inactive"
        : "Active";
    } else {
      return console.log("waiting for response");
    }
  };

  const activityStatus = checkActivity(id);
  console.log(`Account is ${activityStatus}`);

  return (
    <section className="recent-trades-container">
      {politician.role === "Rep" && (
        <div>
          <h2>: Recent Transactions</h2>
          {firstFiveTransaction?.length > 0 ? (
            <ul className="rep-transaction-list">
              {firstFiveTransaction.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No recent trades.</p>
          )}
        </div>
      )}

      {politician.role === "Sen" && (
        <div>
          <h2>: Recent Transactions</h2>
          {firstFiveSenateTransactions?.length > 0 ? (
            <ul className="senate-transaction-list">
              {firstFiveSenateTransactions.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No recent trades.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default PoliticianRecentTrade;
