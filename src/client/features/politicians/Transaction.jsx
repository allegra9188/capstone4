import React from 'react'

export default function Transaction({transaction}) {
  return (
    <div>
        <li>Transaction Date: {transaction.transaction_date}</li>
        <li>Disclosure Date: {transaction.disclosure_date}</li>
        <li>Owner: {transaction.owner}</li>
        <li>Ticker: {transaction.ticker}</li>
        <li>Asset Description: {transaction.asset_description}</li>
        <li>Asset Type: {transaction.type}</li>
        <li>Amount: {transaction.amount}</li>
        <li>Industry: {transaction.industry}</li>
        <li className='end'>Sector: {transaction.sector}</li>
    </div>
  )
}
