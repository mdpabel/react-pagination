import React from 'react';

const ErrorFallbackComponent = ({ error }) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre className='text-red-700'>{error.message}</pre>
    </div>
  );
};

export default ErrorFallbackComponent;
