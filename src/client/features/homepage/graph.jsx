import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import Transaction from "../politicians/transactions/Transaction";
// import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Graph({ transactions }) {
    // Generate labels and data dynamically from transactions
    
    const labels = transactions.map((transaction) => transaction.industry);
    const data = transactions.map((transaction) => transaction.disclosure_year);
  
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Transaction Amounts',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    };
  
    return <Doughnut data={chartData} options={options} />;
  }