import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {countOccurrences} from '../Utils/countOccurences'

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphComponent = ({ data }) => {
    const cities = data.map(entry => entry['City']);
    const cityCounts = countOccurrences(cities);
  
    // Prepare data for Chart.js
    const chartData = {
      labels: Object.keys(cityCounts),
      datasets: [
        {
          label: 'Cities',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: Object.values(cityCounts),
        },
      ],
    };
  
    // Chart.js options
    const options = {
      scales: {
        indexAXIS: 'Y',
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };
  
    return (
      <div>
        <h2>Graph Showing Countries and Cities</h2>
        <Bar data={chartData} options={options} />
      </div>
    );
  };
  
  export default GraphComponent;
  