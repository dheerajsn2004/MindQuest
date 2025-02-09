import React from 'react';

const RequiredError = ({ children }) => {
    return (
        <span className='block text-sm sm:text-base text-red-400 pt-1 sm:pt-2 text-end'>
            {children}
        </span>
    );
};

export default RequiredError;
