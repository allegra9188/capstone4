import React from "react";
import fetchHouseData from "../../../server/api/house";
import fetchSenateData from "../../../server/api/senate";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./politicianSlice";

function PoliticianRecentTrade() {
  const [houseData, setHouseData] = useState(null); // Initialize useState
  const [senateData, setSenateData] = useState(null);
  const { id } = useParams();
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);

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

  useEffect(() => {
    // Fetch senate data
    fetchSenateData()
      .then((senateData) => {
        setSenateData(senateData);
        console.log(senateData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]); // Add dependencies to re-run effect when the ID changes

  const firstFiveTransaction = houseData
    ? houseData
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

  const firstFiveSenateTransactions = senateData
    ? senateData
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
    if (Array.isArray(houseData) && Array.isArray(senateData)) {
      return houseData.length === 0 && senateData.length === 0
        ? "Inactive"
        : "Active";
    } else {
      return console.log("waiting for response");
    }
  };

  const activityStatus = checkActivity(id);
  console.log(`Account is ${activityStatus}`);

  return (
    <section>
      {politician.role === "Rep" && (
        <div>
          <h2>Recent Transactions</h2>
          {firstFiveTransaction?.length > 0 ? (
            <ul className="politician-transaction-list">
              {firstFiveTransaction.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No active trading.</p>
          )}
        </div>
      )}

      {politician.role === "Sen" && (
        <div>
          <h2>Recent Transactions</h2>
          {firstFiveSenateTransactions?.length > 0 ? (
            <ul className="politician-senate-transaction-list">
              {firstFiveSenateTransactions.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No active trading.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default PoliticianRecentTrade;
