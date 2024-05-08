import React from 'react';
import { Bar } from 'react-chartjs-2';
import { countOccurrences } from '../Utils/countOccurences';

function ResponseSizeDistributionChart({ data }) {
  // Extract response sizes
  const responseSizes = extractValues(data, 'Response Size');

  // Count occurrences of each response size
  const sizeOccurrences = countOccurrences(responseSizes);

  // Extract keys (response sizes) and values (occurrences)
  const { keys, values } = getKeysAndValues(sizeOccurrences);

  // Chart data
  const chartData = {
    labels: keys,
    datasets: [{
      label: 'Frequency',
      data: values,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  // Options for the chart
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Response Size (bytes)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency',
        },
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className='ResponseSizeDistributionChart'>
      <h2 className='title'>Response Size Distribution</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

// Utility function to extract values from an array of objects based on a key
function extractValues(inputObject, keyName) {
  return inputObject.map(entry => entry[keyName]);
}

// Utility function to get keys and values from an object
function getKeysAndValues(inputObject) {
  const keys = Object.keys(inputObject);
  const values = Object.values(inputObject);
  return { keys, values };
}

export default ResponseSizeDistributionChart;
