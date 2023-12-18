import React from "react";
import { useParams } from "react-router-dom";
import { useGetPoliticianQuery } from "./slices/politicianSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import PoliticianRecentTrade from "./PoliticianRecentTrade";
import { useFollows } from "../Account/follows/followUtility";
import "./styling/PoliticianDetails.less";
import MemberHouseData from "./Member_houseData";

function PoliticianDetails() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const { data: politician, isLoading, isError } = useGetPoliticianQuery(id);
  const { handleAddFollow, followedPoliticians } = useFollows();


  if (isLoading) {
    return <h1 className="loading">Loading Politician...</h1>;
  }
  //console.log('politician', politician)
  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div className="details-container">
      {token ? (
        <>
          <section className="politician-details">
            <h2>{politician?.first_name + " " + politician.last_name}</h2>
            <p>
              {politician.role}, {politician.party}
            </p>
            <p>District: {politician.district}</p>
            <MemberHouseData />
            <button
              className="favButton"
              onClick={() => handleAddFollow(politician)}
            >
              {followedPoliticians &&
              followedPoliticians.some(
                (followed) => followed.politicianId === politician.id
              )
                ? "Unfollow"
                : "Follow"}
            </button>
          </section>
          <PoliticianRecentTrade />
          
        </>
      ) : (
        // not signed in
        <>
          <section className="politician-details">
            <h2>{politician?.first_name + " " + politician?.last_name}</h2>
            <p>
              {politician.role}, {politician.party}
            </p>
            <p>District: {politician.district}</p>
          </section>
          <PoliticianRecentTrade />
          <MemberHouseData />
        </>
      )}
    </div>
  );
}

export default PoliticianDetails;