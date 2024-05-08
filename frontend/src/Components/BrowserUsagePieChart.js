import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { generateRandomColors } from '../Utils/getRandomColor';
import {
  countOccurrences,
  extractValues,
  getKeysAndValues,
} from '../Utils/countOccurences';
import { sortByValueDescending } from '../Utils/sortObjectBydescending';

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels);

function BrowserUsagePieChart({ data }) {
  // Extract browser names
  const browsers = extractValues(data, 'Browser');

  // Count occurrences of each browser
  const browserOccurrences = countOccurrences(browsers);

  // Sort the browsers by their occurrence count in descending order
  const sortedBrowsers = sortByValueDescending(browserOccurrences);

  // Extract keys (browser names) and values (occurrences)
  const { keys, values } = getKeysAndValues(sortedBrowsers);

  // Generate random colors based on the number of browsers
  const backgroundColors = generateRandomColors(keys.length);

  const chartData = {
    labels: keys,
    datasets: [
      {
        label: 'Browser Count',
        data: values,
        borderWidth: 2,
        backgroundColor: backgroundColors,
      },
    ],
  };
  // const options = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Browser Usage',
  //       color: '#0ea5e9',
  //       font: {
  //         size: 34,
  //       },
  //       padding: {
  //         top: 30,
  //         bottom: 30,
  //       },
  //       datalabels: {
  //         display: true
          
  //       },
  //       formatter: (value, ctx) => {
  //         const total = ctx.chart.getDatasetMeta(0).total;
  //         let percentage = (value * 100 / total).toFixed(2) + "%";
  //         return percentage + '(' + value + ')';
  //       },
  //       animation: {
  //         animateScale: true,
  //       },
  //     },
  //   },
  // };

  return (
    <div className='BrowserUsagePieChart'>
      <h2 className='title'>Browser Usage</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default BrowserUsagePieChart;
