import React from "react";
import { useGetInsightsQuery } from "./insightsSlice";

function Insights() {
  const { data, error, isLoading } = useGetInsightsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lobbying-container">
      <h2>Live Lobbying</h2>
      {data.map((entry, index) => (
        <div className="lobbying-card" key={index}>
          <p>Latest Filing Date: {entry.latest_filing_filing_date}</p>
          <p><span id="bold">Specific Issues: </span>{entry.specific_issues_0}</p>
          <p><span id="bold">Lobbying Client: </span>{entry.lobbying_client_name}</p>
          <p>Lobbying Client Description: {entry.lobbying_client_general_description}</p>
          <p>Lobbying Registrant: {entry.lobbying_registrant_name}</p>
          <p>Lobbying Registrant Description: {entry.lobbying_registrant_general_description}</p>
          <p>Lobbyist Name: {entry.lobbyists_0_name}</p>
          <p>Lobbyist Position Covered: {entry.lobbyists_0_covered_position}</p>
          <p>In House: {entry.inhouse}</p>
          <p>Latest Filing URL: <a href={entry.latest_filing_pdf_url}>{entry.latest_filing_pdf_url}</a></p>
          <p></p>
        </div>
      ))}
      <h3>Sourced from ProPublica</h3>
    </div>
  );
}

export default Insights;
