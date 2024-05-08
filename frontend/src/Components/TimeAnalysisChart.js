// import React, { useState, useEffect } from 'react';
// import { Line} from 'react-chartjs-2';
// import { countOccurrences, extractValues, getKeysAndValues } from '../Utils/countOccurences';

// function TimeAnalysisChart({ sampleData }) {
//   // State to store the selected day
//   const [selectedDay, setSelectedDay] = useState('');

//   // Extract timestamps
//   const timestamps = extractValues(sampleData, 'Time Stamp');

//   // Count occurrences per day
//   const frequenciesPerDay = countOccurrencesPerDay(timestamps);

//   // Find the day with the highest frequency
//   useEffect(() => {
//     const days = Object.keys(frequenciesPerDay);
//     if (days.length > 0) {
//       const maxFrequencyDay = days.reduce((maxDay, currentDay) => (frequenciesPerDay[currentDay] > frequenciesPerDay[maxDay] ? currentDay : maxDay));
//       setSelectedDay(maxFrequencyDay);
//     }
//   }, [frequenciesPerDay]);

//   // Extract timestamps for the selected day
//   const filteredSampleData = selectedDay ? sampleData.filter(entry => entry['Time Stamp'].startsWith(selectedDay)) : sampleData;
//   const timestampsForSelectedDay = extractValues(filteredSampleData, 'Time Stamp');

//   // Count occurrences per 10 minutes
//   const frequencies = countOccurrencesPerInterval(timestampsForSelectedDay, 10);

//   // Extract keys (timestamps) and values (occurrences)
//   const { keys, values } = getKeysAndValues(frequencies);

//   // Data for the charts
//   const data = {
//     labels: keys.map(formatTime), // Adjusting time format
//     datasets: [{
//       label: 'Frequency',
//       data: values,
//       borderColor: '#0ea5e9'
//     }],
//   };

//   // Options for the charts
//   const options = {
//     responsive: true,
//   };

//   // Handler to update selected day
//   const handleDayChange = (event) => {
//     setSelectedDay(event.target.value);
//   };

//   return (
//     <div className='TimeAnalysisChart'>
//       {/* Dropdown to select day */}
//       <select value={selectedDay} onChange={handleDayChange}>
//         <option value="">All Days</option>
//         {/* Add options for each unique day in the sample data */}
//         {Object.keys(frequenciesPerDay).map(day => (
//           <option key={day} value={day}>{day}</option>
//         ))}
//       </select>

//       <h2 className='title'><h2>Requests Time Analysis</h2></h2>
//       <Line data={data} options={options} />

//     </div>
//   );
// }

// // Function to count occurrences per day
// function countOccurrencesPerDay(timestamps) {
//   const occurrences = {};
//   timestamps.forEach(timestamp => {
//     const day = timestamp.split(' ')[0];
//     occurrences[day] = (occurrences[day] || 0) + 1;
//   });
//   return occurrences;
// }

// // Function to count occurrences per specified interval (in minutes)
// function countOccurrencesPerInterval(timestamps, interval) {
//   const occurrences = {};
//   timestamps.forEach(timestamp => {
//     const intervalStart = getIntervalStart(timestamp, interval);
//     occurrences[intervalStart] = (occurrences[intervalStart] || 0) + 1;
//   });
//   return occurrences;
// }

// // Function to get the start of the interval for a given timestamp
// function getIntervalStart(timestamp, interval) {
//   const date = new Date(timestamp);
//   const intervalStartMinutes = Math.floor(date.getMinutes() / interval) * interval;
//   date.setMinutes(intervalStartMinutes);
//   date.setSeconds(0);
//   return date.toISOString();
// }

// // Function to format time (adjusting time format to include day and date)
// function formatTime(timestamp) {
//   const date = new Date(timestamp);
//   return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
// }

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { countOccurrences, extractValues, getKeysAndValues } from '../Utils/countOccurences';

function TimeAnalysisChart({ sampleData }) {
  // State to store the selected time interval
  const [selectedInterval, setSelectedInterval] = useState(10); // Default interval: 10 minutes

  // State to store the selected day
  const [selectedDay, setSelectedDay] = useState('');

  // Extract timestamps
  const timestamps = extractValues(sampleData, 'Time Stamp');

  // Count occurrences per day
  const frequenciesPerDay = countOccurrencesPerDay(timestamps);

  // Find the day with the highest frequency
  useEffect(() => {
    const days = Object.keys(frequenciesPerDay);
    if (days.length > 0) {
      const maxFrequencyDay = days.reduce((maxDay, currentDay) => (frequenciesPerDay[currentDay] > frequenciesPerDay[maxDay] ? currentDay : maxDay));
      setSelectedDay(maxFrequencyDay);
    }
  }, [frequenciesPerDay]);

  // Extract timestamps for the selected day
  const filteredSampleData = selectedDay ? sampleData.filter(entry => entry['Time Stamp'].startsWith(selectedDay)) : sampleData;
  const timestampsForSelectedDay = extractValues(filteredSampleData, 'Time Stamp');

  // Count occurrences per selected time interval
  const frequencies = countOccurrencesPerInterval(timestampsForSelectedDay, selectedInterval);

  // Extract keys (timestamps) and values (occurrences)
  const { keys, values } = getKeysAndValues(frequencies);

  // Data for the charts
  const data = {
    labels: keys.map(formatTime), // Adjusting time format
    datasets: [{
      label: 'Frequency',
      data: values,
      borderColor: '#0ea5e9'
    }],
  };

  // Options for the charts
  const options = {
    responsive: true,
  };

  // Handler to update selected day
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Handler to update selected time interval
  const handleIntervalChange = (event) => {
    setSelectedInterval(parseInt(event.target.value));
  };

  return (
    <div className='TimeAnalysisChart'>
      {/* Dropdown to select day */}
      <select value={selectedDay} onChange={handleDayChange}>
        <option value="">All Days</option>
        {/* Add options for each unique day in the sample data */}
        {Object.keys(frequenciesPerDay).map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>

      {/* Dropdown to select time interval */}
      <select value={selectedInterval} onChange={handleIntervalChange}>
        <option value={1}>1 minute</option>
        <option value={2}>2 minutes</option>
        <option value={3}>3 minutes</option>
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={60}>1 hour</option>
        <option value={180}>3 hours</option>
        <option value={720}>12 hours</option>
      </select>

      <h2 className='title'>Requests Time Analysis</h2>
      <Line data={data} options={options} />

    </div>
  );
}

// Function to count occurrences per day
function countOccurrencesPerDay(timestamps) {
  const occurrences = {};
  timestamps.forEach(timestamp => {
    const day = timestamp.split(' ')[0];
    occurrences[day] = (occurrences[day] || 0) + 1;
  });
  return occurrences;
}

// Function to count occurrences per specified interval (in minutes)
function countOccurrencesPerInterval(timestamps, interval) {
  const occurrences = {};
  timestamps.forEach(timestamp => {
    const intervalStart = getIntervalStart(timestamp, interval);
    occurrences[intervalStart] = (occurrences[intervalStart] || 0) + 1;
  });
  return occurrences;
}

// Function to get the start of the interval for a given timestamp
function getIntervalStart(timestamp, interval) {
  const date = new Date(timestamp);
  const intervalStartMinutes = Math.floor(date.getMinutes() / interval) * interval;
  date.setMinutes(intervalStartMinutes);
  date.setSeconds(0);
  return date.toISOString();
}

// Function to format time (adjusting time format to include day and date)
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit' });
}

export default TimeAnalysisChart;
