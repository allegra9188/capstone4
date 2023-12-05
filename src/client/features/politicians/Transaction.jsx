import React from 'react'
import { Link } from 'react-router-dom'
export default function Transaction({transaction}) {
  return (
    <section>
        <li>Transaction Date: {transaction.transaction_date}</li>
        <li>Disclosure Date: {transaction.disclosure_date}</li>
        <li>Owner: {transaction.owner}</li>
        <Link className="politician-detail" to={`/companies/name/${transaction.ticker}`}><li>Ticker: {transaction.ticker}</li></Link>
        <li>Asset Description: {transaction.asset_description}</li>
        <li>Asset Type: {transaction.type}</li>
        <li>Amount: {transaction.amount}</li>
        <li>Industry: {transaction.industry}</li>
        <li className='end'>Sector: {transaction.sector}</li>
    </section>
  )
}
