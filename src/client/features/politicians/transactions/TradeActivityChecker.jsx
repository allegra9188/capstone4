import React from "react";
import "../styling/PoliticianDetails.less";
export const checkActivity = (politician, houseTrades, senateTrades) => {
  if (!politician) {
    return false;
  }

  if (politician.role === "Rep" && Array.isArray(houseTrades)) {
    // Check if there are any transactions for the representative
    const representativeTrades = houseTrades.filter((transaction) => {
      return (
        transaction.representative &&
        transaction.representative
          .toLowerCase()
          .includes(politician.first_name.toLowerCase()) &&
        transaction.representative
          .toLowerCase()
          .includes(politician.last_name.toLowerCase())
      );
    });

    return representativeTrades.length > 0;
  } else if (politician.role === "Sen" && Array.isArray(senateTrades)) {
    // Check if there are any transactions for the senator
    const senatorTrades = senateTrades.filter((transaction) => {
      return (
        transaction.senator &&
        transaction.senator
          .toLowerCase()
          .includes(politician.first_name.toLowerCase()) &&
        transaction.senator
          .toLowerCase()
          .includes(politician.last_name.toLowerCase())
      );
    });

    return senatorTrades.length > 0;
  }

  return false; // Default to false if role is not recognized or trades are not arrays
};

const TradeActivityChecker = ({ politician, houseTrades, senateTrades }) => {
  const activityStatus = checkActivity(politician, houseTrades, senateTrades);

  return (
    <div className="activity-status">
      <p>Account is {activityStatus ? "active" : "inactive"}</p>
    </div>
  );
};

export default TradeActivityChecker;
