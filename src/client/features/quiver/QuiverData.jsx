import React, { useState, useEffect } from "react";
import { useGetQuiverDataQuery } from "./quiverSlice";

export default function QuiverData() {
  const {data:quiverData2, isloading } = useGetQuiverDataQuery();

  if(isloading){
    return <h1>Loading</h1>
  }
  const quiverData = quiverData2?.slice(0,5)
  return (
    <section className="trades-container">
      <h2>Live Congress Trading</h2>
      <ul className="trading-full-list">
        {quiverData?.map((entry) => (
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
