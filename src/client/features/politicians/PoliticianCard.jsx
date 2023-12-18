import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { useFollows } from "../Account/follows/followUtility";

function PoliticianCard({ politician }) {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const { handleAddFollow, followedPoliticians } = useFollows();

  return (
    <div className="cards-container">
      {token ? (
        <section className="politicianDetails-Card">
          <h2>{politician.first_name + " " + politician.last_name}</h2>
          <p>
            {politician.role}, {politician.party}
          </p>
          <Link to={`/politicians/${politician.id}`}>More Info</Link>
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
      ) : (
        <section className="politicianDetails-Card">
          <h2>{politician.first_name + " " + politician.last_name}</h2>
          <p>
            {politician.role}, {politician.party}
          </p>
          <Link to={`/politicians/${politician.id}`}>More Info</Link>
        </section>
      )}
    </div>
  );
}

export default PoliticianCard;
