import React from "react";
import { useGetInsightsQuery, useGetSummariesQuery } from "./insightsSlice";
import PaginationLogic from "../politicians/PaginationLogic";

function Insights() {
  const { data, error: insightsError, isLoading: insightsLoading } = useGetInsightsQuery();
  const { data: summaryData, error: summariesError, isLoading: summariesLoading } = useGetSummariesQuery();

  const loading = insightsLoading || summariesLoading;
  const error = insightsError || summariesError;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Define the renderItem function for PaginationLogic
  const renderItem = (item, index) => (
    <div className="lobbying-card" key={index}>
      <p>Latest Filing Date: {item.latest_filing_filing_date}</p>
      <p>
        <span id="bold">Specific Issues: </span>
        {item.specific_issues_0}
      </p>
      <p>
        <span id="bold">Lobbying Client: </span>
        {item.lobbying_client_name}
      </p>
      <p>
        Lobbying Client Description: {item.lobbying_client_general_description}
      </p>
      <p>Lobbying Registrant: {item.lobbying_registrant_name}</p>
      <p>
        Lobbying Registrant Description:{" "}
        {item.lobbying_registrant_general_description}
      </p>
      <p>Lobbyist Name: {item.lobbyists_0_name}</p>
      <p>Lobbyist Position Covered: {item.lobbyists_0_covered_position}</p>
      <p>In House: {item.inhouse}</p>
      <p>
        Latest Filing URL:{" "}
        <a href={item.latest_filing_pdf_url}>{item.latest_filing_pdf_url}</a>
      </p>
    </div>
  );

  // Define the renderSummary function
  const renderSummary = (summary, index) => (
    <div className="summary-card" key={index}>
      <p><span id="bold">Action Description: </span>{summary.actionDesc}</p>
      <p>Current Chamber: {summary.currentChamber}</p>
      <p><span id="bold">Summary Text: </span>{summary.text}</p>
      <p>Action Date: {summary.actionDate}</p>
      <p>Update Date: {summary.updateDate}</p>
    </div>
  );
  

  return (
    <div>
      <div className="lobbying-container">
        <h2>Live Lobbying</h2>
        <PaginationLogic data={data} pageSize={2} renderItem={renderItem} />
      </div>
      
      <div className="summaries-container">
        <h2>Live Summaries</h2>
        <PaginationLogic data={summaryData} pageSize={2} renderItem={renderSummary} />
      </div>
    </div>
  );
}

export default Insights;
