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

function RegionalAnalysisChart({ data }) {
  const regionNames = extractValues(data, 'Region');
  const regionOccurrences = countOccurrences(regionNames);
  const sortedRegionOccurrences = sortByValueDescending(regionOccurrences);
  const { keys: regionKeys, values: regionValues } = getKeysAndValues(sortedRegionOccurrences);

  const chartData = generateChartData(regionKeys, regionValues, 'Regional Analysis');
  const chartOptions = generateChartOptions();

  return (
    <div className='RegionalAnalysisChart'>
      <h2 className='title'>Regional Analysis</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default RegionalAnalysisChart;
