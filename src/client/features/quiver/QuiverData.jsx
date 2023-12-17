import React, { useState, useEffect } from "react";
import { useGetQuiverDataFromCsvQuery } from "./quiverSlice";
import { Link } from "react-router-dom";

export default function QuiverData() {
  const { data: quiverData2, isloading } = useGetQuiverDataFromCsvQuery();

  if (isloading) {
    return <h1 className="loading">Loading</h1>;
  }
  const quiverData = quiverData2?.slice(0, 4);
  return (
    <section className="trades-container">
      <h2 className="liveCongress-text">Live Congress Trading </h2>
      <span className="seeAll-span"><Link className="seeAll-link" to={`/livetrading`}>See All Transactions</Link></span>
      {/* <Link className="seeAll-link" to={`/livetrading`}>See All Transactions</Link> */}
      <ul className="trading-full-list">
        {quiverData?.map((entry) => (
          <li className="trading-item" key={entry.ReportDate}>
            <Link
              className="politician-detail"
              to={`/politicians/name/${entry.Representative}`}
            >
              <p>
                <span id="trade-rep">{entry.Representative}</span>
              </p>
            </Link>
            <p>{entry.House} {entry.Party}</p>
            <p>Transaction Date: {entry.TransactionDate}</p>
            <Link to={`/companies/name/${entry.Ticker}`}>
              <p>
                <span id="ticker">Ticker: </span>
                <span id="trade-ticker">{entry.Ticker}</span>
              </p>
            </Link>
            <p>{entry.Transaction}</p>
            <p>{entry.Range}</p>
            <p>{entry.District}</p>
            <p>{entry.Tyle} {entry.Option_Type} {entry.Strike} {entry.Expiry}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
