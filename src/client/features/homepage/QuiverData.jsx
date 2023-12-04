import React, { useState, useEffect } from "react";

export default function QuiverData() {
  const [quiverData, setQuiverData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/quiverquant");
        const data = await response.json();
        setQuiverData(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching Quiver data: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="trades-container">
      <h2>Live Congress Trading</h2>
      <ul className="trading-full-list">
        {quiverData.map((entry) => (
          <li className="trading-item" key={entry.ReportDate}>
            <p>{entry.Representative}</p>
            <p>{entry.House}</p>
            <p>Transaction Date: {entry.TransactionDate}</p>
            <p>Ticker: {entry.Ticker}</p>
            <p>{entry.Transaction}</p>
            <p>{entry.Range}</p>
            <p>{entry.District}</p>
            <p>Party: {entry.Party}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
