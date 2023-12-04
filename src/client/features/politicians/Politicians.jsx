import React, { useState } from "react";
import PoliticianCard from "./PoliticianCard";
import { useGetPoliticiansQuery } from "./politicianSlice";
import PaginationLogic from "./PaginationLogic";
import "./PoliticianDetails.less";

export default function Politicians() {
  const { data: politicians, isLoading } = useGetPoliticiansQuery();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("first-name"); // Set default sorting by first_name

  const searchRegex = new RegExp(filter, "i");

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const sortPoliticians = (politicians, sortBy) => {
    // Create a copy of the politicians array to avoid modifying the original
    const sortedPoliticians = [...politicians];

    if (sortBy === "first-name") {
      return sortedPoliticians.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sortBy === "last-name") {
      return sortedPoliticians.sort((a, b) => a.last_name.localeCompare(b.last_name));
    } else {
      return sortedPoliticians; // No sorting
    }
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <section>
      <div className="search-and-sort-container">
        <form>
          <input
            type="text"
            placeholder="Search Name..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <div>
          <label>Sort By:</label>
          <select id="sort-by" onChange={handleSort} value={sortBy}>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
          </select>
        </div>
      </div>
      <h1>Politicians</h1>
      <PaginationLogic
        data={sortPoliticians(politicians, sortBy).filter((politician) =>
          (politician.first_name + politician.last_name).match(searchRegex)
        )}
        renderItem={(politician) => (
          <PoliticianCard key={politician.id} politician={politician} />
        )}
      />
    </section>
  );
}
