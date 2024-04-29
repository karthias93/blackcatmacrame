import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        border: '4px solid #ccc',
        borderRadius: '50%',
        borderTopColor: '#333',
        animation: 'spin 1s infinite linear',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Loader;
