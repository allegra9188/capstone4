import React, { useState } from "react";
import { useGetQuiverDataFromCsvQuery } from "../quiver/quiverSlice";
import { Link } from "react-router-dom";
import PaginationLogic from "../politicians/PaginationLogic";
// import { useGetPoliticiansQuery } from "../politicians/slices/politicianSlice";

export default function LiveTrading() {
  // const { data: politicians, isLoading } = useGetPoliticiansQuery();
  const { data: quiverData2, isloading } = useGetQuiverDataFromCsvQuery();
  const [filterBy, setFilterBy] = useState("All");
  const [showDems, setShowDems] = useState(false);
  const [showRepubs, setShowRepubs] = useState(false);

  
  const handleFilter = (e) => {
    setFilterBy(e.target.value);
  };

  const filterTrades = (quiverData2, filterBy) => {
    if (filterBy === "Representatives") {
      return quiverData2.filter((entry) => entry.House === "Representatives");
    } else if (filterBy === "Senate") {
      return quiverData2.filter((entry) => entry.House === "Senate");
    } else if (filterBy === "Democrats"){
      return  quiverData2.filter((entry) => entry.Party === "D");
    } else if (filterBy === "Republicans"){
      return quiverData2.filter((entry) => entry.Party === "R");
    } 
    else {
      return quiverData2; // No filtering
    }
  };

  const filteredTrades = filterTrades(quiverData2, filterBy);

  const filteredTradesByParty = filteredTrades 
  ? filteredTrades.filter((entry) => 
      (!showDems && !showRepubs) || // Show all if neither checkbox is selected
      (showDems && entry.Party === "D") || 
      (showRepubs && entry.Party === "R"))
  : filteredTrades;

  if (isloading) {
    return <h1 className="loading">Loading</h1>;
  }
  // console.log("filteredTrades", filteredTrades);
  // console.log("filteredDems", filteredDems);
  // console.log("filteredRepubs", filteredRepubs);
  return (
    <section id="congressLive-Trading">
      <h2>Live Congress Trading</h2>
      <div className="filter-container">
        <label className="filterlabel" htmlFor="filter">
          Filter by:
        </label>
        <select id="filter" onChange={handleFilter} value={filterBy}>
          <option value="All">All</option>
          <option value="Representatives">Representatives</option>
          <option value="Senate">Senate</option>
        </select>
        {/* {filteredTrades && <p className="filter-results">{`(${filteredTrades.length})`}</p>} */}
        <label className="dems-checkbox party-checkbox">Democrats
        <input
            type="checkbox"
            className="dems-checkbox-input checkbox-input"
            name="Democrat"
            checked={showDems}
            onChange={() => setShowDems(!showDems)}
          />
          </label>
          <label className="repubs-checkbox party-checkbox">Republicans
        <input
            type="checkbox"
            className="repubs-checkbox-input checkbox-input"
            name="Republican"
            checked={showRepubs}
            onChange={() => setShowRepubs(!showRepubs)}
          />
          </label>
      </div>

      <ul className="liveTrading-List">
        {filteredTrades && (
          <PaginationLogic
            data={filteredTradesByParty}
            pageSize={30}
            renderItem={(entry, index) => (
              <li
                key={index}
                className={`liveTrading-item ${
                  entry.Party === "R"
                    ? "republicans"
                    : entry.Party === "D"
                    ? "democrats"
                    : ""
                }`}
              >
                <Link
                  className="politician-detail"
                  to={`/politicians/name/${entry.Representative}`}
                >
                  <p>
                    <span id="trade-rep">{entry.Representative}</span>
                  </p>
                </Link>
                <p>
                  {entry.House} {entry.Party}
                </p>
                <p>Transaction Date: {entry.TransactionDate}</p>
                <p>
                  <span id="ticker-text">Ticker: </span>
                  <span id="liveTrade-ticker">
                    <Link to={`/companies/name/${entry.Ticker}`}>
                      {entry.Ticker}
                    </Link>
                  </span>
                </p>
                <p>{entry.Transaction}</p>
                <p>{entry.Range}</p>
                <p>{entry.District}</p>
              </li>
            )}
          />
        )}
      </ul>
    </section>
  );
}
