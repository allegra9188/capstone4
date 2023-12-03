import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link } from "react-router-dom";

function PolitcianCard({ politician }) {
  const token = useSelector(selectToken);
  const handleSubmit = (e) => {
    e.preventDefault();
    // will add function to add to favorite list once api is functional
    // need slice and connectivity to api and database
  };
  return (
    <div className="cards-container">
      {token ? (
        <section className="politicianDetails-Card">
          <h2>{politician.first_name + politician.last_name}</h2>
          <p>Party: {politician.party}</p>
          <p>Role: {politician.role}</p>
          <Link to={`/politicians/${politician.id}`}>More Info</Link>
          <button className="favButton" onClick={handleSubmit}>Favorite</button>
        </section>
      ) : (
        <section>
          <h2>{politician.first_name + " " + politician.last_name}</h2>
          <p>Party: {politician.party}</p>
          <p>Role: {politician.role}</p>
          <Link to={`/politicians/${politician.id}`}>More Info</Link>
        </section>
      )}
    </div>
  );
}

export default PolitcianCard;
