import React from "react";
import { useGetHouseDataFromProPublicaQuery } from "./slices/houseApiSlice";
import { useGetPoliticianQuery } from "./slices/politicianSlice";
import { useParams } from "react-router-dom";

const MemberHouseData = () => {
  const { id } = useParams();

  // Fetch ProPublica House data using the custom query
  const {
    data: houseData,
    error,
    isFetching,
  } = useGetHouseDataFromProPublicaQuery();

  // Fetch existing politician data
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);

  if (isError) {
    // Handle error
    console.error("Error fetching ProPublica House data:", error);
    return <div>Error fetching data</div>;
  }

  if (isFetching || isLoading || !politician || !houseData) {
    // Data is still loading or no existing politician data
    return <div>Loading...</div>;
  }

  // Check if there is a matching politician in the ProPublica House data
  const matchedPolitician = houseData.find(
    (propublicaPolitician) =>
      propublicaPolitician.first_name === politician.first_name &&
      propublicaPolitician.last_name === politician.last_name
  );

  // Render the data if there is a match
  return (
    <div className="member-house-details">
      {matchedPolitician ? (
        <>
          <p>
            <a href={matchedPolitician.url}>{matchedPolitician.url}</a>
          </p>
          <p>Updated: {matchedPolitician.last_updated}</p>
          <br />
          <p>{matchedPolitician.office}</p>
          <p>{matchedPolitician.phone}</p>
          <p>Twitter: @{matchedPolitician.twitter_account}</p>
          <p>Next Election: {matchedPolitician.next_election}</p>
          <p>Total Votes: {matchedPolitician.total_votes}</p>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MemberHouseData;
