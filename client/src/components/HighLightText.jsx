import React from 'react';

const HighLightText = ({ children }) => {
  return (
    <span className='inline-block mx-2 sm:mx-3 bg-gradient-to-b from-green-400 to-green-800 px-3 sm:px-4 text-lg sm:text-xl rounded-full'>
      {children}
    </span>
  );
}

export default HighLightText;
