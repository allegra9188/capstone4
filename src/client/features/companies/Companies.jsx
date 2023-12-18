import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import { useGetCompaniesQuery } from "./companySlice";
import PaginationLogic from "../politicians/PaginationLogic";

export default function Companies() {
  const { data: companies, isLoading } = useGetCompaniesQuery();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24; // Adjust the page size as needed

  const searchRegex = new RegExp(filter, "i");

  // Check if companies is still loading or undefined
  if (isLoading || !companies) {
    return <h1 className="loading"></h1>;
  }

  const filteredCompanies = companies.filter((company) => {
    // Check if the symbol or security matches the search filter
    return (
      searchRegex.test(company.symbol) || searchRegex.test(company.security)
    );
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const renderItem = (company) => (
    <CompanyCard company={company} key={company.id} />
  );

  return (
    <div>
      <div className="search-bar-companies">
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <h2 id="s-p-name">S&P 500 Companies:</h2>
      <div className="company-list">
        {filteredCompanies.length === 0 ? (
          <p>No matching companies found.</p>
        ) : (
          <>
            <PaginationLogic
              data={filteredCompanies}
              pageSize={pageSize}
              renderItem={renderItem}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
