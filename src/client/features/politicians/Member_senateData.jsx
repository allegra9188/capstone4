import React from "react";
import { useGetSenateDataFromProPublicaQuery } from "./slices/senateApiSlice";
import { useGetPoliticianQuery } from "./slices/politicianSlice";
import { useParams } from "react-router-dom";

const MemberSenateData = () => {
    const { id } = useParams();

    // Fetch ProPublica House data using the custom query
    const {
      data: senateData,
      error,
      isFetching,
    } = useGetSenateDataFromProPublicaQuery();
  
    // Fetch existing politician data
    const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);
  
    if (isError) {
      // Handle error
      console.error("Error fetching ProPublica Senate data:", error);
      return <div>Error fetching data</div>;
    }
  
    if (isFetching || isLoading || !politician || !senateData) {
      // Data is still loading or no existing politician data
      return <div>Loading...</div>;
    }
  
    // Check if there is a matching politician in the ProPublica House data
    const matchedPolitician = senateData.find(
      (propublicaPolitician) =>
        propublicaPolitician.first_name === politician.first_name &&
        propublicaPolitician.last_name === politician.last_name
    );
  
    // Render the data if there is a match
    return (
      <div className="member-senate-details">
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
}

export default MemberSenateData;