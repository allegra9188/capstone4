import React, { useState, useEffect } from "react";
import fetchQuiverData from "../../../server/api/quiverApi";

export default function QuiverData() {
  const [quiverData, setQuiverData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuiverData();
        setQuiverData(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching Quiver data: ", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(quiverData)
  
  return (
    <div>
      <h2>Quiver Live Congress Trading Data:</h2>
      <ul>
        {quiverData.map((entry) => (
          <li key={entry.ReportDate}>
            <p>Representative: {entry.Representative}</p>
            <p>Transaction Date: {entry.TransactionDate}</p>
            <p>Ticker: {entry.Ticker}</p>
            <p>Transaction: {entry.Transaction}</p>
            <p>Range: {entry.Range}</p>
            <p>District: {entry.District}</p>
            <p>Amount: {entry.Amount}</p>
            <p>Party: {entry.Party}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
