import React from "react";
import Transaction from "./transactions/Transaction";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./slices/politicianSlice";
import { useGetSenateDataQuery } from "./slices/senateApiSlice";
import { useGetHouseDataQuery } from "./slices/houseApiSlice";
import "./styling/PoliticianDetails.less";
import TradeActivityChecker from "./transactions/TradeActivityChecker";
// import { Graph } from "../homepage/graph";

function PoliticianRecentTrade() {
  const { id } = useParams();
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);
  const { data: senateTrades } = useGetSenateDataQuery();
  const { data: houseTrades } = useGetHouseDataQuery();
 

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
    return <h1 className="loading">Loading Politician...</h1>;
  }
  //console.log('politician', politician)
  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <section className="recent-trades-container">
      <h2>Recent Transactions</h2>
      {politician.role === "Rep" && (
        <>
          {firstFiveTransaction?.length > 0 ? (
            <ul className="rep-transaction-list">
              {firstFiveTransaction.map((transaction, i) => (
                <Transaction
                  key={String(transaction.id) + i}
                  transaction={transaction}
                />
              ))}
            </ul>
          ) : (
            <p>No recent trades.</p>
          )}
        </>
      )}

      {politician.role === "Sen" && (
        <>
          {firstFiveSenateTransactions?.length > 0 ? (
            <ul className="senate-transaction-list">
              {firstFiveSenateTransactions.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No recent trades.</p>
          )}
        </>
      )}
      {politician.role && (
        // <>
        //   <Graph transactions={firstFiveTransaction || firstFiveSenateTransactions} />
        // </>
        <TradeActivityChecker
          politician={politician}
          houseTrades={houseTrades}
          senateTrades={senateTrades}
        />
      )}
    </section>
  );
}

export default PoliticianRecentTrade;
