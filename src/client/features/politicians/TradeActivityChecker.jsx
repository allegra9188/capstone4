import React from "react";

const TradeActivityChecker = ({ politician, houseTrades, senateTrades }) => {
  const checkActivity = () => {
    const fullName = `${politician.first_name} ${politician.last_name}`;

    if (politician.role === "Rep" && Array.isArray(houseTrades)) {
      // Check if there are any transactions for the representative
      const representativeTrades = houseTrades.filter((transaction) => {
        return (
          transaction.representative &&
          transaction.representative
            .toLowerCase()
            .includes(fullName.toLowerCase())
        );
      });

      return representativeTrades.length > 0;
    } else if (politician.role === "Sen" && Array.isArray(senateTrades)) {
      // Check if there are any transactions for the senator
      const senatorTrades = senateTrades.filter((transaction) => {
        return (
          transaction.senator &&
          transaction.senator.toLowerCase().includes(fullName.toLowerCase())
        );
      });

      return senatorTrades.length > 0;
    }

    return false; // Default to false if role is not recognized or trades are not arrays
  };

  const activityStatus = checkActivity();

  return (
    <div>
      <p>Account is {activityStatus ? "active" : "inactive"}</p>
    </div>
  );
};

export default TradeActivityChecker;
