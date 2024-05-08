import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { countOccurrences } from '../Utils/countOccurences';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ResponseSizeScatterPlot({ data }) {
  // Extract response sizes
  const responseSizes = extractValues(data, 'Response Size');

  // Count occurrences of each response size
  const sizeOccurrences = countOccurrences(responseSizes);

  // Extract keys (response sizes) and values (occurrences)
  const { keys, values } = getKeysAndValues(sizeOccurrences);

  // Chart data
  const scatterData = {
    datasets: [{
      label: 'Response Size Distribution',
      data: keys.map((key, index) => ({ x: parseInt(key), y: values[index] })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    }],
  };

  return <Scatter options={options} data={scatterData} />;
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

const options = {
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
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

export default ResponseSizeScatterPlot;
