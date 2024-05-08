import React, { useEffect, useState } from 'react';
import { FILE_GET_ENDPOINT } from '../Config/EnvironmentVariables';
import axios from 'axios';
import './DashBoard.css';

import ServerStatistics from './ServerStatistics'
import StatusCodeBarChart from './StatusCodeBarChart'
import SimpleMap from '../SimpleMap';
import CountryRequestsBarChart from './CountryRequestsBarChart'
import TopTenRequestedURLs from './TopTenRequestedURLs'
import HttpVerbDonutChart from './HttpVerbDonutChart'
import BrowserUsagePieChart from './BrowserUsagePieChart'
import TimeAnalysisChart from './TimeAnalysisChart'
import ResponseSizeDistributionChart from './ResponseSizeDistributionChart'
import RegionalAnalysisChart from './RegionalAnalysisChart'
import OperatingSystemUsageChart from './OperatingSystemUsageChart'
function DashBoard() {
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    const fetchProcessedData = async () => {
      try {
        // Get the filename and folder name from the cookie and remove surrounding double quotes
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('folder_name='))
          ?.split('=')[1]
          ?.replace(/^"(.*)"$/, '$1');

        if (!cookieValue) {
          throw new Error('Folder name not found in cookie');
          //TODO

          // PUT TOAST HERE FOR ERROR WHEN COOKIE IS NOT AVAILABLE
        }

        // Make a GET request to the backend API using Axios
        const FILE_GET_ENDPOINT_URL = `${FILE_GET_ENDPOINT}/${cookieValue}`;
        const response = await axios.get(FILE_GET_ENDPOINT_URL, {
          withCredentials: true, // Include cookies in the request
        });

        // Check if the response is successful
        if (response.status !== 200) {
          throw new Error('Failed to fetch processed data');
        }

        // Set the processed data in state
        setProcessedData(response.data);
      } catch (error) {
        console.error('Error fetching processed data:', error);
      }
    };

    fetchProcessedData();
  }, []);


  if (!processedData) return null
  const { server_statistics,df,geolocation_data} = processedData;
  console.log(df)
 
  // Exclude static_files_statistics from rendering
  const { static_files_statistics, ...otherStatistics } = server_statistics;
  // console.log('type of: ',typeof(otherStatistics))
  // console.log(Object.entries(otherStatistics))
  return (

    <div className='dashboard'>
  
      <h1 className='dashboardTitle'>Dashboard</h1>
    
      <ServerStatistics  stats = {server_statistics}/>

      <StatusCodeBarChart data={df}/>
      <TopTenRequestedURLs data = {df}/>

      <SimpleMap geolocation_data = {geolocation_data}/>
      <CountryRequestsBarChart data = {df}/>

      <TimeAnalysisChart sampleData={df}/>

      <BrowserUsagePieChart data = {df}/>
      <OperatingSystemUsageChart data = {df}/> 
 
      <RegionalAnalysisChart data = {df}/>

      <HttpVerbDonutChart data = {df}/>
      <ResponseSizeDistributionChart data ={df}/>
    </div>
  );
}

export default DashBoard;


//2598425