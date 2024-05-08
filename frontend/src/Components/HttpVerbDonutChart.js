import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  countOccurrences,
  extractValues,
  getKeysAndValues,
} from '../Utils/countOccurences';
import { sortByValueDescending } from '../Utils/sortObjectBydescending';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function HttpVerbDonutChart({ data }) {
  // Extract HTTP verbs
  const HTTPVerbs = extractValues(data, 'HTTP Method');

  // Count occurrences of each HTTP verb
  const HTTPVerbsOccurrences = countOccurrences(HTTPVerbs);

  // Sort the HTTP verbs by their occurrence count in descending order
  const sortedHTTPVerbs = sortByValueDescending(HTTPVerbsOccurrences);

  // Extract keys (HTTP verbs) and values (occurrences)
  const { keys, values } = getKeysAndValues(sortedHTTPVerbs);

  // Define chart data
  const chartData = {
    labels: keys,
    datasets: [
      {
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], 
        borderWidth: 2,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', 
      },
    //   tooltip: {
    //     callbacks: {
    //       label: (context) => {
    //         const label = context.label || '';
    //         const value = context.formattedValue || '';
    //         return `${label}: ${value}`; 
    //       },
    //     },
    //   },
    // },
    }
  };
  

  return (
    <div className='HttpVerbDonutChart'>
      <h2 className='title'>Http Methods Distribution</h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

export default HttpVerbDonutChart;
