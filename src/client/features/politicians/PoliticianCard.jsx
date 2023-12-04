import React from "react";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUserId,
  useGetAccountQuery,
} from "../auth/authSlice";
import {
  useAddFollowedPoliticiansMutation,
  useFetchFollowedPoliticiansQuery,
  useRemoveFollowedPoliticiansMutation,
} from "../Account/followings/followSlice";
import { Link, useParams } from "react-router-dom";

function PoliticianCard({ politician }) {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const [addFollowedPolitician] = useAddFollowedPoliticiansMutation();
  const [removeFollowedPolitician] = useRemoveFollowedPoliticiansMutation();

  const { data: user } = token ? useGetAccountQuery(userId) : { data: null };
  const { data: followedPoliticians, refetch: refetchFollows } = token
    ? useFetchFollowedPoliticiansQuery(userId)
    : { data: null, refetch: null };

  const handleAddFollow = async () => {
    try {
      if (politician && user && followedPoliticians) {
        const politicianId = politician.id;

        const isPoliticianFollowed = followedPoliticians.some(
          (followed) => followed.politicianId === politicianId
        );

        if (isPoliticianFollowed) {
          // remove from followed
          await removeFollowedPolitician({ userId, politicianId });
        } else {
          // add to followed
          await addFollowedPolitician({ userId, politicianId });
        }

        refetchFollows();
      }
    } catch (error) {
      // handle error
      console.error("Error updating followed status:", error);
    }
  };

  return (
    <div className="cards-container">
      {token ? (
        <section className="politicianDetails-Card">
          <h2>{politician.first_name + " " + politician.last_name}</h2>
          <p>Party: {politician.party}</p>
          <p>Role: {politician.role}</p>
          <Link to={`/politicians/${politician.id}`}>More Info</Link>
          <button className="favButton" onClick={handleAddFollow}>
            {followedPoliticians && followedPoliticians.some((followed) => followed.politicianId === politician.id)
              ? "Unfollow"
              : "Follow"}
          </button>
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

export default PoliticianCard;
