import React from 'react';
import './ServerStatistics.css';

function capitalizeAndReplaceUnderscores(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Render a single statistic item
function StatisticItem({ name, value }) {
  return (
    <div className="card">
      <p className="card-title">{capitalizeAndReplaceUnderscores(name)}</p>
      <p className="card-value">{value}</p>
    </div>
  );
}

// Render nested statistics recursively
function NestedStatistics({ stats }) {
  return (
    <div className="nested-stats">
      {Object.entries(stats).map(([key, value]) => (
        <StatisticItem key={key} name={key} value={value} />
      ))}
    </div>
  );
}

// Render statistics, handling nested objects
function ServerStatistics({ stats }) {
  if (!stats || typeof stats !== 'object') {
    return null; // Return null if stats is not valid
  }

  // Use spread operator to exclude 'not_found_404'
  const { not_found_404, ...otherStats } = stats;

  return (
    <div className="card-container">
      {Object.entries(otherStats).map(([key, value]) => (
        typeof value === 'object' ? (
          <NestedStatistics key={key} stats={value} />
        ) : (
          <StatisticItem key={key} name={key} value={value} />
        )
      ))}
    </div>
  );
}

export default ServerStatistics;
