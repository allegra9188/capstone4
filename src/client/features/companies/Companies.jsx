import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import { useGetCompaniesQuery } from "./companySlice";
// import PaginationLogic from "../politicians/PaginationLogic";

export default function Companies() {
  const { data: companies, isLoading } = useGetCompaniesQuery();
  const [filter, setFilter] = useState("");

  const searchRegex = new RegExp(filter, "i");

  // Check if companies is still loading or undefined
  if (isLoading || !companies) {
    return <h1 className="Loading">loading</h1>;
  }

  const filteredCompanies = companies.filter((company) => {
    // Check if the symbol or security matches the search filter
    return (
      searchRegex.test(company.symbol) || searchRegex.test(company.security)
    );
  });

  return (
    <div>
      <div className="search-bar">
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="company-list">
        {filteredCompanies.length === 0 ? (
          <p>No matching companies found.</p>
        ) : (
          filteredCompanies.map((company) => (
            <CompanyCard company={company} key={company.id} />
          ))
        )}
      </div>
    </div>
  );
}
