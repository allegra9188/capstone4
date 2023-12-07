import React from "react";
import { useParams } from "react-router";
import { useGetCompanyIdByTickerQuery } from "./companySlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
// this component catch the ticker, and then pass to back end
// back end use the ticker to search the database and return the company
// then we redirect to the company page
export default function CompanyRedirect() {
  const { name, isloading: isloading2 } = useParams();
  if (isloading2) {
    return <h1 className="loading">redirecting</h1>;
  }
  const { data: company } = useGetCompanyIdByTickerQuery(name);

  const navigate = useNavigate();

  useEffect(() => {
    if (company) {
      navigate(`/companies/${company.id}`);
    }
  }, [company, navigate]);

  return (
    <div>
      This company is not in our database, which consist of only 503 companies
    </div>
  );
}
