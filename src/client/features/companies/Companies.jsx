import React from "react";
import CompanyCard from "./CompanyCard";
import { useGetCompaniesQuery } from "./companySlice";

export default function Companies() {
  const { data: companies, isLoading } = useGetCompaniesQuery();
  //console.log(typeof(companies))

  if (isLoading) {
    return <li>loading</li>;
  }

  return (
    <div className="company-list">
      {companies?.map((company) => (
        <CompanyCard company={company} key={company.id} />
      ))}
    </div>
  );
}
