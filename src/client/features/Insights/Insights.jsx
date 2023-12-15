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
    <div>
      {data.map((entry, index) => (
        <div key={index}>
          <p>Lobbying Client: {entry.lobbying_client_name}</p>
          <p>Lobbying Client Description: {entry.lobbying_client_general_description}</p>
          <p>Lobbying Registrant: {entry.lobbying_registrant_name}</p>
          <p>Lobbying Registrant Description: {entry.lobbying_registrant_general_description}</p>
          {/* Add more data points as needed */}
        </div>
      ))}
    </div>
  );
}

export default Insights;
