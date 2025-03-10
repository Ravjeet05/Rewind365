import React from 'react';

const TimeRangeButtons = ({ timeRange, onChange }) => {
  const ranges = [
    { value: 'short_term', label: '4 Weeks' },
    { value: 'medium_term', label: '6 Months' },
    { value: 'long_term', label: 'All Time' }
  ];

  return (
    <div className="time-range-buttons">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={timeRange === range.value ? 'active' : ''}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeButtons;