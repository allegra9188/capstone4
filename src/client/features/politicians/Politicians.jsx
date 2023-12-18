import React, { useState } from "react";
import PoliticianCard from "./PoliticianCard";
import { useGetPoliticiansQuery } from "./slices/politicianSlice";
import PaginationLogic from "./PaginationLogic";
import "./styling/PoliticiansList.less";
import { checkActivity } from "./transactions/TradeActivityChecker";
import { useGetSenateDataQuery } from "./slices/senateApiSlice";
import { useGetHouseDataFromS3Query } from "./slices/houseApiSlice";

export default function Politicians() {
  const { data: politicians, isLoading } = useGetPoliticiansQuery();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("first-name"); // Set default sorting by first_name
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const { data: senateTrades } = useGetSenateDataQuery();
  const { data: houseTrades } = useGetHouseDataFromS3Query();

  const searchRegex = new RegExp(filter, "i");

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const sortPoliticians = (politicians, sortBy) => {
    // Create a copy of the politicians array to avoid modifying the original
    const sortedPoliticians = [...politicians];

    if (sortBy === "first-name") {
      return sortedPoliticians.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    } else if (sortBy === "last-name") {
      return sortedPoliticians.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
    } else {
      return sortedPoliticians; // No sorting
    }
  };

  const filteredPoliticians = showActiveOnly
    ? politicians.filter((politician) =>
        checkActivity(politician, houseTrades, senateTrades)
      )
    : politicians;

  return isLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <section className="politicianList-section">
      <div className="search-and-sort-container">
        <form className="search-bar">
          <label htmlFor="search"></label>
          <input
            type="text"
            placeholder="  Search Name...  "
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <div>
          <label></label>
          <select id="sort-by" onChange={handleSort} value={sortBy}>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
          </select>
        </div>
        <section className="toggle-active-only">
          <input
            type="checkbox"
            id="Active"
            name="Active"
            checked={showActiveOnly}
            onChange={() => setShowActiveOnly(!showActiveOnly)}
          />
          <label htmlFor="Active">Show Active Only</label>
        </section>
      </div>
      <h1 className="politicians-header">Congress Members</h1>
      <PaginationLogic
        data={sortPoliticians(filteredPoliticians, sortBy).filter(
          (politician) =>
            (politician.first_name + politician.last_name).match(searchRegex)
        )}
        pageSize={24}
        renderItem={(politician) => (
          <PoliticianCard key={politician.id} politician={politician} />
        )}
      />
    </section>
  );
}
