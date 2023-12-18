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
  // console.log("House Data:", houseData);
  // console.log("Politician Data:", politician);
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
          {/* <h2>
            {matchedPolitician.first_name + " " + matchedPolitician.last_name}
          </h2> */}
          {/* <p>
            {matchedPolitician.title}, {matchedPolitician.party}
          </p> */}
          {/* <p>District: {matchedPolitician.district}</p> */}
          {/* Add the rest of the fields */}
          <p>Twitter: @{matchedPolitician.twitter_account}</p>
          <p>Facebook: {matchedPolitician.facebook_account}</p>
          <p>URL: {matchedPolitician.url}</p>
          {/* <p>Contact Form: {matchedPolitician.contact_form}</p> */}
          <p>Next Election: {matchedPolitician.next_election}</p>
          <p>Total Votes: {matchedPolitician.total_votes}</p>
          <p>Last Updated: {matchedPolitician.last_updated.slice(0,10)}</p>
          <p>Office: {matchedPolitician.office}</p>
          <p>Phone: {matchedPolitician.phone}</p>
          <p>State: {matchedPolitician.state}</p>
        </>
      ) : (
        <div>
          No matching ProPublica House data found for the given politician
        </div>
      )}
    </div>
  );
};

export default MemberHouseData;
