import React from 'react';
import { Bar } from 'react-chartjs-2';
import { countOccurrences, extractValues, getKeysAndValues } from '../Utils/countOccurences';
import { sortByValueDescending } from '../Utils/sortObjectBydescending';

function generateChartData(keys, values, label) {
  return {
    labels: keys,
    datasets: [{
      label: label,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: values
    }]
  };
}

function generateChartOptions() {
  return {
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  };
}

function OperatingSystemUsageChart({ data }) {

  const operatingSystemNames = extractValues(data, 'Operating System');
  const operatingSystemOccurrences = countOccurrences(operatingSystemNames);
  const sortedOperatingSystemOccurrences = sortByValueDescending(operatingSystemOccurrences);
  const { keys:operatingSystemKeys, values:operatingSystemValues } = getKeysAndValues(sortedOperatingSystemOccurrences);

  const operatingSystemChartData = generateChartData(operatingSystemKeys, operatingSystemValues, 'Operating System Usage');
  const chartOptions = generateChartOptions();

  return (
    <div className='OperatingSystemUsageChart'>
        <h2 className='title'>Operating System Usage</h2>
        <Bar data={operatingSystemChartData} options={chartOptions} />
    </div>
  );
}

export default OperatingSystemUsageChart;
