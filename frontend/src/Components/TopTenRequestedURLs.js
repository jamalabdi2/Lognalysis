import React from 'react';
import { countOccurrences, extractValues } from '../Utils/countOccurences';
import { sortByValueDescending } from '../Utils/sortObjectBydescending';
import { getFirstTenURLs } from '../Utils/TopTenUrls';
import './TopTenRequestedURLs.css'

function TopTenRequestedURLs({ data }) {
    // Extract requested URLs
    const requestedURLs = extractValues(data, 'Requested URL');

    // Calculate the occurrences
    const requestedURLsOccurences = countOccurrences(requestedURLs);

    // Sort in descending order
    const sortedRequestedURLs = sortByValueDescending(requestedURLsOccurences);

    // Grab top ten
    const topTenUrls = getFirstTenURLs(sortedRequestedURLs);

    return (
        <div className="container">
            <h2 className="title">Top Five Requested URLs</h2>
            <div className="table-container">
                <table className="url-table">
                    <thead>
                        <tr>
                            <th>Requested URL</th>
                            <th>Visitors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(topTenUrls).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopTenRequestedURLs;
