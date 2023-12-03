import React from "react";
import CompanyCard from "./CompanyCard";
import { useGetCompaniesQuery } from "./companySlice";

export default function Companies() {
  const { data: companies, isLoading } = useGetCompaniesQuery();
  //console.log(typeof(companies))

  if (isLoading) {
    return <h1 className="Loading">loading</h1>;
  }

  return (
    <div className="company-list">
      {companies?.map((company) => (
        <CompanyCard company={company} key={company.id} />
      ))}
    </div>
  );
}
