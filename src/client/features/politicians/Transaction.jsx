import React from "react";
import { Link } from "react-router-dom";
export default function Transaction({ transaction }) {
  return (
    <section className="recent-trades-item">
      <li>Transaction Date: {transaction.transaction_date}</li>
      <li>Disclosure Date: {transaction.disclosure_date}</li>
      <li>Owner: {transaction.owner}</li>
      <Link
        className="politician-detail"
        to={`/companies/name/${transaction.ticker}`}
      >
        <li id="trade-ticker">Ticker: {transaction.ticker}</li>
      </Link>
      <li>{transaction.asset_description}</li>
      <li>Transaction: {transaction.type}</li>
      <li>Range: {transaction.amount}</li>
      <li>Industry: {transaction.industry}</li>
      <li className="end">Sector: {transaction.sector}</li>
    </section>
  );
}
