import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { countOccurrences, extractValues, getKeysAndValues } from '../Utils/countOccurences';
import { sortByValueDescending } from '../Utils/sortObjectBydescending';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

function CountryRequestsBarChart({ data }) {
  //COUNTRIES
  const countryNames = extractValues(data, 'Country Fullname');
  const countryOccurrences = countOccurrences(countryNames);
  const sortedCountryOccurrences = sortByValueDescending(countryOccurrences);
  const { keys: countryKeys, values: countryValues } = getKeysAndValues(sortedCountryOccurrences);

  //CITIES
  const citiesNames = extractValues(data, 'City');
  const citiesOccurrences = countOccurrences(citiesNames);
  const sortedCityOccurrences = sortByValueDescending(citiesOccurrences);
  const { keys: cityKeys, values: cityValues } = getKeysAndValues(sortedCityOccurrences);

  const chartData = generateChartData(countryKeys, countryValues, 'Number of Requests from Countries');
  const cityChartData = generateChartData(cityKeys, cityValues, 'Number of Requests from Cities');

  const chartOptions = generateChartOptions();
  const cityChartOptions = generateChartOptions();

  return (
    <div className='CountryRequestsBarChart'>
      <div className='CountryRequestsBarChart_bar'>
          <h2 className = 'title'>Number of Requests from Countries</h2>
          <Bar data={chartData} options={chartOptions} /> 
      </div>
      <div className='CountryRequestsBarChart_bar'> 
          <h2 className='title'>Number of Requests from Cities</h2>
          <Bar data={cityChartData} options={cityChartOptions} />
      </div>
      
      
    </div>
  );
}

export default CountryRequestsBarChart;
