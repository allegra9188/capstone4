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
            <p>Representative: {entry.Representative}</p>
            <p>Transaction Date: {entry.TransactionDate}</p>
            <p>Ticker: {entry.Ticker}</p>
            <p>Transaction: {entry.Transaction}</p>
            <p>Range: {entry.Range}</p>
            <p>District: {entry.District}</p>
            <p>Amount: ${entry.Amount}</p>
            <p>Party: {entry.Party}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
