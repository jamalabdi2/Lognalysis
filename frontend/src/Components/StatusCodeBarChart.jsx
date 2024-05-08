import React from 'react'
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js'


import { countOccurrences, 
  extractValues, 
  getKeysAndValues 
} from '../Utils/countOccurences'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement

)




function StatusCodeBarChart({data}) {
  //extract status code from the dataset
  const statusCodeList =extractValues(data,['Status Code'])
 
  //count occurrences of each status code
  const statusCodeCounts = countOccurrences(statusCodeList)
  
  // prepare data for bar graph
  const {keys, values} = getKeysAndValues(statusCodeCounts)

  const chartData = {
    labels: keys,
    datasets: [
      {
        label: 'Distribution of Status Code',
        backgroundColor: 'rgba(75, 192, 192, 0.4',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: values,
      }
    ]
  }
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
  // const chartOptions = {
  //   indexAxis: 'y', // Set the index axis to 'y' for a horizontal bar chart
  //   scales: {
  //     x: {
  //       ticks: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // };
  



  return (
    <div className='statusCodeBarChart'>
      <h2 className="title">Distribution of Status Code</h2>
      <Bar data={chartData} options={chartOptions}/>
    </div>
  )
}

export default StatusCodeBarChart